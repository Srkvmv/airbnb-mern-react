import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;
let listings;

export default class ListingsDAO {
  static async injectDB(conn) {
    if (listings) {
      return;
    }
    try {
      listings = await conn
        .db(process.env.MONGO_DB)
        .collection("listingsAndReviews");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in listingsDAO: ${e}`
      );
    }
  }

  static async getListings({
    filters = null,
    page = 0,
    listingsPerPage = 20
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } };
      } else if ("property_type" in filters) {
        query = { property_type: { $eq: filters["property_type"] } };
      }
    }

    let cursor;

    try {
      cursor = await listings.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { listingsList: [], totalNumListings: 0 };
    }

    const displayCursor = cursor
      .limit(listingsPerPage)
      .skip(listingsPerPage * page);

    try {
      const listingsList = await displayCursor.toArray();
      const totalNumListings = await listings.countDocuments(query);

      return { listingsList, totalNumListings };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { listingsList: [], totalNumListings: 0 };
    }
  }

  static async getListingByID(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: id
          }
        }
      ];
      return await listings.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getListingByID: ${e}`);
      throw e;
    }
  }
}
