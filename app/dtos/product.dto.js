export function validProductFields(body) {
    const requieredFields = [
        "title",
        "description",
        "code",
        "price",
        "status",
        "stock",
        "category",
        "thumbnails"
    ];
    const missingFields = requieredFields.filter(field => body[field] === undefined || body[field] === null || body[field] === "")

    if (missingFields.length > 0) {
        throw new Error(`Requiered Fields: ${missingFields.join(", ")}`);
    }
}