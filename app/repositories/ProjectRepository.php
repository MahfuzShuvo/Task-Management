<?php

namespace App\repositories;

use App\Models\Project;
use Illuminate\Http\Request;
use App\interfaces\CrudInterface;

class ProjectRepository implements CrudInterface
{
    public function getAll()
    {
        $projects = Project::withCount('tasks')->get();
        return $projects;
    }
    public function findById($id)
    {
        $project = Project::with('tasks')->find($id);
        return $project;
    }
    public function create(Request $request)
    {
        $project = new Project();
        $project->name = $request->name;
        $project->description = $request->description;
        $project->user_id = $request->user_id;
        $project->save();

        return $project;
    }
    public function edit(Request $request, $id)
    {
        $project = Project::find($id);
        $project->name = $request->name;
        $project->description = $request->description;
        $project->user_id = $request->user_id;
        $project->save();

        return $project;
    }
    public function delete($id)
    {
        $project = Project::find($id);
        $project->delete();

        return $project;
    }
}