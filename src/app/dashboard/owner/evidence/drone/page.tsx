import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function UploadDronePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Upload Drone Imagery</h1>
      <Card>
        <CardHeader title="Drone Imagery" />
        <CardBody>
          <div className="text-sm text-gray-700 mb-3">Upload GeoTIFF or MP4 files</div>
          <input type="file" className="text-sm" />
          <div className="mt-4">
            <Button>Upload</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
