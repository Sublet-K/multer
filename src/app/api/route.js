import { createRouter, expressWrapper } from "next-connect";
import { writeFile } from "fs/promises";
import multer from "multer";
import { NextResponse } from "next/server";

export const config = {
	api: {
		bodyParser: true,
	},
};

const upload = multer({
	storage: multer.diskStorage({
		destination: "./public/uploads",
		filename: (req, file, cb) => {
			console.log(req);
			console.log(file);
			return cb(null, file.originalname + "-" + Date.now());
		},
	}),
});

const router = createRouter();

router
	.use(upload.single("photo"))
	.get((req, res) => {
		return NextResponse.json({ message: "get pong!" });
	})
	.post((req, res) => {
		console.log(req);
		console.log(req.headers);
		if (req.file) return NextResponse.json({ message: "pong!" });
		return NextResponse.json({ message: "failed" }, { status: 400 });
	});

export function GET(req, ctx) {
	return router.run(req, ctx);
}

export async function POST(request) {
	console.log(request);
	const data = await request.formData();

	console.log(data);
	const file = data.get("photo");

	if (!file) {
		return NextResponse.json({ success: false });
	}

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	// With the file data in the buffer, you can do whatever you want with it.
	// For this, we'll just write it to the filesystem in a new location
	const path = `./tmp/${file.name}`;
	await writeFile(path, buffer);
	console.log(`open ${path} to see the uploaded file`);

	return NextResponse.json({ success: true });
}
