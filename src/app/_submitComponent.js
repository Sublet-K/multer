"use client";

export default function FileSubmit() {
	const onSubmit = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		console.log(e.target.photo.files[0]);
		console.log(e.target.photo.files[0]);
		formData.set("photo", e.target.photo.files[0]);
		console.log(formData.getAll("photo"));
		const resp = await fetch("http://localhost:3000/api", {
			method: "POST",
			body: formData,
		});
		if (!resp.ok) {
			console.log("fetch failed");
			return;
		}
		const result = await resp.json();
		console.log(result);
	};
	return (
		<form onSubmit={onSubmit}>
			<input type="file" name="photo" />
			<input type="submit" value="제출" />
		</form>
	);
}
