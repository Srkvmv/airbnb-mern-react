import ReservationsDAO from "../dao/reservationsDAO.js";

export default class ReservationsController {
  static async apiPostReservation(req, res, next) {
    try {
      const reservationInfo = {
        guestName: req.body.guestName,
        contact: req.body.contact,
        adults: parseInt(req.body.adults),
        children: parseInt(req.body.children),
        infants: parseInt(req.body.infants),
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        nights: req.body.nights,
        status: req.body.status,
        listing: req.body.listing,
        totalPrice: req.body.totalPrice,
        confirmationCode: req.body.confirmationCode
      };
      const ReservationResponse = await ReservationsDAO.addReservation(
        reservationInfo
      );
      res.status(201).json({ status: "Reservation added" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReservation(req, res, next) {
    try {
      const reservationId = req.body._id;
      const contact = req.body.contact;

      const response = await ReservationsDAO.updateReservation(
        reservationId,
        contact
      );

      var { error } = response;
      if (error) {
        res.status(400).json({ error });
      }

      if (response.modifiedCount === 0) {
        throw new Error("unable to update reservation ");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReservation(req, res, next) {
    try {
      const reservationId = req.query.id;
      const reservationResponse = await ReservationsDAO.deleteReservation(
        reservationId
      );
      res.status(204).json({ status: "Reservation deleted" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiFindReservationbyId(req, res, next) {
    try {
      const reservationId = req.query.id;
      let reservation = await ReservationsDAO.findReservationbyId(
        reservationId
      );
      if (!reservation) {
        res.status(404).json({ error: "Reservation not found" });
        return;
      }
      res.status(200).json(reservation);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
