import express from "express";
import ListingsCtrl from "./listings.controller.js";
import ReservationsCtrl from "./reservations.controller.js";
const router = express.Router();

router.route("/").get(ListingsCtrl.apiGetListings);
router.route("/id/:id").get(ListingsCtrl.apiGetListingById);

router
  .route("/reservation")
  .get(ReservationsCtrl.apiFindReservationbyId)
  .post(ReservationsCtrl.apiPostReservation)
  .put(ReservationsCtrl.apiUpdateReservation)
  .delete(ReservationsCtrl.apiDeleteReservation);

export default router;
