const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/auth.routes");
const imovelRoutes = require("./routes/imovel.routes");
const corretorRoutes = require("./routes/corretor.routes");
const imagemRoutes = require("./routes/imagem.routes");
const mensagemRoutes = require("./routes/mensagem.routes");
const usuarioRoutes = require("./routes/usuario.routes");
const contratoRoutes = require("./routes/contrato.routes");

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/imoveis", imovelRoutes);
app.use("/api/corretores", corretorRoutes);
app.use("/api/imagens", imagemRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/mensagens", mensagemRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/contratos", contratoRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "API Site Imobiliária funcionando!"
    });
});

module.exports = app;