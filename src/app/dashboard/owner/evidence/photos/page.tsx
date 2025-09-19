import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function UploadPhotosPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Upload Photos</h1>
      <Card>
        <CardHeader title="Photos" />
        <CardBody>
          <div className="text-sm text-gray-700 mb-3">Select images to upload</div>
          <input type="file" multiple className="text-sm" />
          <div className="mt-4">
            <Button>Upload</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
