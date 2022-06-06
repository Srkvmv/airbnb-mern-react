import mongodb from "mongodb";

const ObjectId = mongodb.ObjectID;

let reservations;

export default class ReservationsDAO {
  static async injectDB(conn) {
    if (reservations) {
      return;
    }
    try {
      reservations = await conn
        .db(process.env.MONGO_DB)
        .collection("reservations");
    } catch (e) {
      console.error(
        `Unable to establish collection handles in reservationsDAO: ${e}`
      );
    }
  }

  static async addReservation(reservation) {
    try {
      const date = new Date();
      const reservationDocument = {
        guestName: reservation.guestName,
        contact: reservation.contact,
        listing: reservation.listing,
        adults: reservation.adults,
        infants: reservation.infants,
        children: reservation.children,
        checkInDate: reservation.checkIn,
        checkOutDate: reservation.checkOut,
        nights: reservation.nights,
        bookingDate: date.toUTCString(),
        status: reservation.status,
        totalPrice: reservation.totalPrice,
        confirmationCode: reservation.confirmationCode
      };
      console.log(reservationDocument);
      return await reservations.insertOne(reservationDocument);
    } catch (e) {
      console.error(`Unable to post reservations: ${e}`);
      return { error: e };
    }
  }

  static async deleteReservation(reservationId) {
    try {
      const deleteResponse = await reservations.deleteOne({
        _id: ObjectId(reservationId)
      });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete reservation: ${e}`);
      return { error: e };
    }
  }
  static async updateReservation(reservationId, contact) {
    try {
      const updateResponse = await reservations.updateOne(
        { _id: ObjectId(reservationId) },
        { $set: { contact: contact } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update reservation: ${e}`);
      return { error: e };
    }
  }

  static async findReservationbyId(reservationId) {
    try {
      const pipeline = [
        {
          $match: {
            _id: ObjectId(reservationId)
          }
        }
      ];
      return await reservations.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Unable to find reservation: ${e}`);
      return { error: e };
    }
  }
}
