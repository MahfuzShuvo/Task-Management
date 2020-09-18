<?php

namespace App\Http\Controllers\API;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\repositories\ProjectRepository;

class ProjectsController extends Controller
{
    public $projectRepository;

    public function __construct(ProjectRepository $projectRepository) {
        $this->projectRepository = $projectRepository;
    }

    /**
     * Show all project list
     */
    public function index()
    {
        $projects = $this->projectRepository->getAll();
    
        return response()->json([
            'success' => true,
            'message' => 'Project List',
            'data' => $projects
        ]);
    }

    /**
     * show a single project
     */
    public function show($id)
    {
        $project = $this->projectRepository->findById($id);

        if (is_null($project)) {
            return response()->json([
                'success' => false,
                'message' => 'Project Details',
                'data' => 'Data not found'
            ]);
        }
    
        return response()->json([
            'success' => true,
            'message' => 'Project Details',
            'data' => $project
        ]);
    }

    /**
     * save project
     */
    public function store(Request $request)
    {
        $formData = $request->all();
        // validation
        $validator = \Validator::make($formData, [
            'name' => 'required',
            'description' => 'required',
            'user_id' => 'required'
        ], [
            'name.required' => 'Please enter project name',
            'description.required' => 'Please enter project description',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
            ]);
        }

        $project = $this->projectRepository->create($request);
        return response()->json([
            'success' => true,
            'message' => 'Project stored successfully',
            'data' => $project
        ]);
    }

    /**
     * edit project
     */
    public function update(Request $request, $id)
    {
        $project = $this->projectRepository->findById($id);

        if (is_null($project)) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found',
                'data' => null
            ]);
        }

        $formData = $request->all();
        // validation
        $validator = \Validator::make($formData, [
            'name' => 'required',
            'description' => 'required',
            'user_id' => 'required'
        ], [
            'name.required' => 'Please enter project name',
            'description.required' => 'Please enter project description',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
            ]);
        }

        $project = $this->projectRepository->edit($request, $id);
        return response()->json([
            'success' => true,
            'message' => 'Project updated successfully',
            'data' => $project
        ]);
    }

    /**
     * delete project
     */
    public function destroy($id)
    {
        $project = $this->projectRepository->findById($id);

        if (is_null($project)) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found',
                'data' => null
            ]);
        }

        $project = $this->projectRepository->delete($id);
        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully',
            'data' => $project
        ]);
    }
}