import { createRouter, expressWrapper } from "next-connect";
import multer from "multer";
import { NextResponse } from "next/server";

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

export function POST(req, ctx) {
	console.log(req);
	return router.run(req, ctx);
}

export const config = {
	api: {
		bodyParser: true,
	},
};
