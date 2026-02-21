"use client";

import { useEffect, useState } from "react";

interface Project {
  _id: string;
  name: string;
  location: string;
  status: string;
  assignedInspector: {
    name: string;
    email: string;
    expertise: string[];
  } | null;
  projectDetails: {
    description: string;
    ecosystemType: string;
    coordinates: number[];
    density: number;
    organizationInfo: {
      organizationName: string;
      ownerName: string;
      email: string;
      phone: string;
    };
    timeline: {
      startDate: string;
      duration: number;
    };
    legal: {
      legalOwnership: string;
      baselineData: string;
      communityConsent: boolean;
    };
    monitoring: {
      monitoringPlan: string;
      validator: string;
    };
    plantationData: any;
    documents: string[];
  };
  statusHistory: {
    status: string;
    updatedBy: {
      name: string;
      email: string;
    };
    updatedAt: string;
    notes: string;
  }[];
}

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch project data");
        }
        const data = await res.json();
        setProject(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  if (loading) {
    return <div className="text-white p-4">Loading project details...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  if (!project) {
    return <div className="text-white p-4">Project not found.</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Project #{project._id}
          </h1>
          <p className="text-sm text-gray-400">
            {project.projectDetails.description}
          </p>
        </div>
        <a
          href="/marketplace"
          className="inline-flex items-center rounded-md bg-emerald-500 px-3 py-1.5 text-black hover:bg-emerald-400 text-sm"
        >
          Buy Credits
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl card-dark p-4">
            <h2 className="font-medium mb-3 text-white">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {project.projectDetails.documents.map((doc, idx) => (
                <img
                  key={idx}
                  src={doc}
                  alt={`Document ${idx + 1}`}
                  className="aspect-video rounded-md object-cover"
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl card-dark p-4">
            <h2 className="font-medium mb-3 text-white">Timeline</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                {project.projectDetails.timeline.startDate} • Project submitted
                for verification
              </li>
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl card-dark p-4">
            <h3 className="font-medium mb-2 text-white">Verification</h3>
            <p className="text-sm text-gray-300">
              Verifier: {project.projectDetails.monitoring.validator}
            </p>
            <p className="text-sm text-gray-300">
              Status: {project.status}
            </p>
            <a
              href="#"
              className="text-sm text-emerald-400 hover:underline"
            >
              View signed attestation
            </a>
          </div>

          <div className="rounded-xl card-dark p-4">
            <h3 className="font-medium mb-2 text-white">Blockchain</h3>
            <ul className="text-sm space-y-1 text-gray-300"></ul>
          </div>
        </aside>
      </div>
    </div>
  );
}