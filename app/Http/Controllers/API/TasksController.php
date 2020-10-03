<?php

namespace App\Http\Controllers\API;

use App\Models\Task;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\repositories\TaskRepository;

class TasksController extends Controller
{
    public $taskRepository;

    public function __construct(TaskRepository $taskRepository) {
        $this->taskRepository = $taskRepository;
    }

    /**
     * Show all task list
     */
    public function index()
    {
        $tasks = $this->taskRepository->getAll();
    
        return response()->json([
            'success' => true,
            'message' => 'Task List',
            'data' => $tasks
        ]);
    }

    /**
     * show a single task
     */
    public function show($id)
    {
        $task = $this->taskRepository->findById($id);

        if (is_null($task)) {
            return response()->json([
                'success' => false,
                'message' => 'Task Details',
                'data' => 'Data not found'
            ]);
        }
    
        return response()->json([
            'success' => true,
            'message' => 'Task Details',
            'data' => $task
        ]);
    }

    /**
     * save task
     */
    public function store(Request $request)
    {
        $formData = $request->all();
        // validation
        $validator = \Validator::make($formData, [
            'name' => 'required',
            'description' => 'required',
            'project_id' => 'required'
        ], [
            'name.required' => 'Please enter task name',
            'description.required' => 'Please enter task description',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $task = $this->taskRepository->create($request);
        return response()->json([
            'success' => true,
            'message' => 'Task stored successfully',
            'data' => $task
        ]);
    }

    /**
     * edit task
     */
    public function update(Request $request, $id)
    {
        $task = $this->taskRepository->findById($id);

        if (is_null($task)) {
            return response()->json([
                'success' => false,
                'message' => 'Task not found',
                'data' => null
            ]);
        }

        $formData = $request->all();
        // validation
        $validator = \Validator::make($formData, [
            'name' => 'required',
            'description' => 'required',
            'project_id' => 'required'
        ], [
            'name.required' => 'Please enter task name',
            'description.required' => 'Please enter task description',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
            ]);
        }

        $task = $this->taskRepository->edit($request, $id);
        return response()->json([
            'success' => true,
            'message' => 'Task updated successfully',
            'data' => $task
        ]);
    }

    /**
     * delete task
     */
    public function destroy($id)
    {
        $task = $this->taskRepository->findById($id);

        if (is_null($task)) {
            return response()->json([
                'success' => false,
                'message' => 'Task not found',
                'data' => null
            ]);
        }

        $task = $this->taskRepository->delete($id);
        return response()->json([
            'success' => true,
            'message' => 'Task deleted successfully',
            'data' => $task
        ]);
    }
}
