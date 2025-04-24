const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

  category: { type: String },
  subCategory: { type: String },
  title: { type: String },
  description: { type: String },
  price: { type: String },
  wilaya: { type: String },
  commune: { type: String },
  contacto: { type: String },



  itemsReservations_Visa: { type: String },
  Location_Vacances: { type: String },
  alquilergeneral: { type: String },
  superficie: { type: String },
  piece: { type: String },
  etage: { type: String },
  promoteurimmobilier: { type: Boolean },
  specifications: { type: Array },

  //HOTEL
  nombredelhotel: { type: String },
  adresshotel: { type: String },
  totalhabitaciones: { type: String },
  tipodehabitaciones: { type: String },
  estrellas: { type: String },
  wifi: { type: Array },
  language: { type: Array },
  tarifnuit: { type: String },
  reservacionenlinea: { type: String },
  politiqueAnnulation: { type: String },
  hotelWebsite: { type: String },
  horariollegada: { type: String },


  horadudepar: { type: String },
  datedepar: { type: String },
  duracionviaje: { type: String },
  transporte: { type: String },
  destinacionvoyage1: { type: String },
  voyage1hotel1: { type: String },
  voyage1nombrehotel1: { type: String },
  destinacionvoyage2: { type: String },
  voyage2hotel2: { type: String },
  voyage1nombrehotel2: { type: String },
  fecharegreso: { type: String },
  serviciosdelhotel: { type: Array },
  incluidoenelprecio: { type: Array },
  cancelarreserva: { type: String },

  destinacionhadj: { type: String },
  estado: {
    type: String,
    enum: ['pendiente', 'aprobado', 'rechazado'],
    default: 'pendiente',
  },

  images: { type: Array },
  likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
  comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
  user: { type: mongoose.Types.ObjectId, ref: 'user' }

}, {
  timestamps: true
});

module.exports = mongoose.model('post', postSchema);
