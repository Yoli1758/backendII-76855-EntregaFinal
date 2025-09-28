export const paginate = async (model, {
    page = 1,
    limit = 10,
    sort = null,
    filter = {},
    populate = ""
}) => {
    try {
        // asegurar que page y limit sean números válidos
        page = parseInt(page) > 0 ? parseInt(page) : 1;
        limit = parseInt(limit) > 0 ? parseInt(limit) : 10;

        const skip = (page - 1) * limit;
        console.log("skip:", skip)

        // query base
        console.log("el filter es filter", filter)
        let query = model.find(filter);

        console.log("estoy en paginate")
        console.log(`con los siguientes datos page:${page},limit:${limit},sort:${sort} query:${query}`)

        if (populate) query = query.populate(populate);
        if (sort) query = query.sort(sort);

        const [results, totalDocs] = await Promise.all([
            query.skip(skip).limit(limit).exec(),
            model.countDocuments(filter)
        ]);

        console.log("result:", results)
        console.log("totaldocs", totalDocs)
        const totalPages = Math.ceil(totalDocs / limit);

        const currentPage = page > totalPages ? totalPages : page;

         //skip = (currentPage - 1) * limit;
         console.log("saliendo de paginate")
        return {
            docs: results,
            totalDocs,
            currentPage,
            page,
            limit,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null
        };
       
    } catch (err) {
        console.error("❌ Error en paginate util:", err);
        throw err;
    }
};
