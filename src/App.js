import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Home from "./component/Home";
import DataMasuk from "./halaman/DataMasuk";
import Beranda from "./halaman/Beranda";
import HasilPengajuan from "./halaman/HasilPengajuan";
import AlurPengajuan from "./halaman/AlurPengajuan";
import Pengajuan from "./halaman/Pengajuan";
import DataDiproses from "./halaman/DataDiproses";
import DataSelesai from "./halaman/DataSelesai";
import DataPembayaran from "./halaman/DataPembayaran";
import UpdateDataTerima from "./halaman/UpdateDataTerima";
import UpdateDataTolak from "./halaman/UpdateDataTolak";
import TambahAkun from "./halaman/TambahAkun";
import DataPembayaranTeam from "./halaman/DataPembayaranTeam";
import EditPengajuan from "./halaman/EditPengajuan";
import DataTolak from "./halaman/DataTolak";
import EditSelesai from "./halaman/EditSelesai";
import "bootstrap/dist/css/bootstrap.min.css";
import { EditPembayaran } from "./halaman/EditPembayaran";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Beranda />} />
          <Route exact path="/alur-pengajuan" element={<AlurPengajuan />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/pengajuan" element={<Pengajuan />} />
          <Route exact path="/hasil/:word" element={<HasilPengajuan />} />
          <Route exact path="/dashboard">
            <Route index element={<Home />} />
            <Route path="tambahaccount" element={<TambahAkun />} />
          </Route>
          <Route exact path="/kematian">
            <Route index element={<DataMasuk />} />
            <Route
              path="kematian/editTerima/:id/:nik_alm/:nama_alm"
              element={<UpdateDataTerima />}
            />
            <Route
              path="kematian/editTolak/:id/:nik_alm/:nama_alm"
              element={<UpdateDataTolak />}
            />
            <Route path="kematian/editData/:id" element={<EditPengajuan />} />
          </Route>
          <Route exact path="/dataproses" element={<DataDiproses />} />
          <Route exact path="/dataselesai">
            <Route index element={<DataSelesai />} />
            <Route
              path="dataselesai/editSelesai/:id/:nik_alm_1"
              element={<EditSelesai />}
            />
          </Route>
          <Route exact path="/datatolak" element={<DataTolak />} />
          <Route exact path="/datapembayaran">
            <Route index element={<DataPembayaran />} />
            <Route
              path="datapembayaran/editPembayaran/:id/:nik_alm_1"
              element={<EditPembayaran />}
            />
          </Route>
          <Route
            exact
            path="/datapembayaranTeam"
            element={<DataPembayaranTeam />}
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
