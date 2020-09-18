<?php

namespace App\repositories;

use App\Models\Task;
use Illuminate\Http\Request;
use App\interfaces\CrudInterface;

class TaskRepository implements CrudInterface
{
    public function getAll()
    {
        $tasks = Task::all();
        return $tasks;
    }
    public function findById($id)
    {
        $task = Task::with('project')->find($id);
        return $task;
    }
    public function create(Request $request)
    {
        $task = new Task();
        $task->name = $request->name;
        $task->description = $request->description;
        $task->project_id = $request->project_id;
        $task->save();

        return $task;
    }
    public function edit(Request $request, $id)
    {
        $task = Task::find($id);
        $task->name = $request->name;
        $task->description = $request->description;
        $task->project_id = $request->project_id;
        $task->save();

        return $task;
    }
    public function delete($id)
    {
        $task = Task::find($id);
        $task->delete();

        return $task;
    }
}