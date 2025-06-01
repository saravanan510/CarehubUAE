import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateNursing from "./pages/PrivateNursing";
import ContactUs from "./pages/ContactUs";
import BookBloodTest from "./pages/BookBloodTest";
import AboutUs from "./components/Assistence";
import PostOperativeCare from "./pages/PostOperativeCare";
import VentilatorCare from "./pages/VentilatorCare";
import PalliativeCare from "./pages/PalliativeCare";
import ElderlyCare from "./pages/ElderlyCare";
import PediatricPalliative from "./pages/PediatricPalliative";
import ParalyticCare from "./pages/ParalyticCare";
import ParkinsonCare from "./pages/ParkinsonCare";
import PysiotheraphyServices from "./pages/PysiotheraphyServices";
import DoctorHomeVisit from "./pages/DoctorHomeVisit";
import MedicalTourism from "./pages/MedicalTourism";
import InjectionServices from "./pages/InjectionServices";
import BloodTest from "./pages/BloodTest";
import HydrafacialServices from "./pages/HydrafacialServices";
import PostStrokeRecovery from "./pages/PostStrokeRecovery";
import SelectDateTime from "./pages/SelectDateTime";
import PatientDetails from "./pages/PatientDetails";
import ConfirmBooking from "./pages/ConfirmBooking";
import RefundPolicy from "./pages/RefundPolicy";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import PaymentStatus from "./pages/PaymentStatus";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider, BookingProvider } from "./context/Context";
import Login from "./admin/page/Login";
import CCPaymentPage from "./pages/CCPaymentPage";
import AdminLayout from "./admin/page/AdminLayout";
import ProtectedRoute from "./admin/component/ProtectedRoute/ProtectedRoute";
import Services from "./admin/component/Services/Services";
import BloodTests from "./admin/component/BloodTest/BloodTest";
import ServiceDeatils from "./admin/component/Services/ServiceDeatils";
import BloodTestDetails from "./admin/component/BloodTest/BloodTestDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home-nursing-services",
        element: <PrivateNursing />,
      },
      {
        path: "/post-operative-care",
        element: <PostOperativeCare />,
      },
      {
        path: "/ventilator-care",
        element: <VentilatorCare />,
      },
      {
        path: "/palliative-care",
        element: <PalliativeCare />,
      },
      {
        path: "/elderly-care",
        element: <ElderlyCare />,
      },
      {
        path: "/pediatric-palliative",
        element: <PediatricPalliative />,
      },
      {
        path: "/paralytic-care",
        element: <ParalyticCare />,
      },
      {
        path: "/parkinson-care",
        element: <ParkinsonCare />,
      },
      {
        path: "/physiotherapy-services",
        element: <PysiotheraphyServices />,
      },
      {
        path: "/doctor-home-visits",
        element: <DoctorHomeVisit />,
      },
      {
        path: "/medical-tourism",
        element: <MedicalTourism />,
      },
      {
        path: "/injection-services",
        element: <InjectionServices />,
      },
      {
        path: "/blood-test",
        element: <BloodTest />,
      },
      {
        path: "/hydrafacial-services",
        element: <HydrafacialServices />,
      },
      {
        path: "/post-stroke-recovery",
        element: <PostStrokeRecovery />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/refund-policy",
        element: <RefundPolicy />,
      },
      {
        path: "/bookbloodtest",
        element: <BookBloodTest />,
      },
      {
        path: "/selectdate&time",
        element: <SelectDateTime />,
      },
      {
        path: "/patientdetails",
        element: <PatientDetails />,
      },
      {
        path: "/confirm",
        element: <ConfirmBooking />,
      },
      {
        path: "/payment",
        element: <CCPaymentPage />,
      },
      {
        path: "/paymentStatus",
        element: <PaymentStatus />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "services",
        element: (
          <ProtectedRoute>
            <Services />
          </ProtectedRoute>
        ),
      },
      {
        path: "bloodtests",
        element: (
          <ProtectedRoute>
            <BloodTests />
          </ProtectedRoute>
        ),
      },
      {
        path: "services/:id",
        element: (
          <ProtectedRoute>
            <ServiceDeatils />
          </ProtectedRoute>
        ),
      },
      {
        path: "bloodtests/:id",
        element: (
          <ProtectedRoute>
            <BloodTestDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BookingProvider>
        <HelmetProvider>
          <RouterProvider router={router}>
            <Layout />
          </RouterProvider>
        </HelmetProvider>
      </BookingProvider>
    </AuthProvider>
  </React.StrictMode>
);
