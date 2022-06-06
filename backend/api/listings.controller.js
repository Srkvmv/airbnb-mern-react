import ListingsDAO from "../dao/listingsDAO.js";

export default class ListingsController {
  static async apiGetListings(req, res, next) {
    const listingsPerPage = req.query.listingsPerPage
      ? parseInt(req.query.listingsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.name) {
      filters.name = req.query.name;
    } else if (req.query.property_type) {
      filters.property_type = req.query.property_type;
    }

    const { listingsList, totalNumListings } = await ListingsDAO.getListings({
      filters,
      page,
      listingsPerPage
    });

    let response = {
      listings: listingsList,
      page: page,
      filters: filters,
      entries_per_page: listingsPerPage,
      total_results: totalNumListings
    };
    res.json(response);
  }

  static async apiGetListingById(req, res, next) {
    try {
      let id = req.params.id || {};
      let listing = await ListingsDAO.getListingByID(id);
      if (!listing) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(listing);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
