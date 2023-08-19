const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    maker: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "CarMaker",
    },
    model: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "CarModel",
    },
    year: {
      type: Number,
      require: true,
    },
    KMsDriven: {
      type: Number,
      require: true,
    },
    fuel: {
      type: String,
      require: true,
      enum: ["Petrol", "Diesel", "LPG", "CNG", "Hybrid", "Electric"],
    },
    registrationCity: {
      type: String,
      require: true,
      enum: [
        "Lahore",
        "Karachi",
        "Islamabad",
        "Sindh",
        "Punjab",
        "Unregistered",
        "Abbottabad",
        "Ahmadpur East",
        "Ali Masjid",
        "Arifwala",
        "Askoley",
        "Attock",
        "Badin",
        "Bagh",
        "Bahawalnagar",
        "Bahawalpur",
        "Bannu",
        "Batagram",
        "Bela",
        "Bhakkar",
        "Bhimber",
        "Buner",
        "Charsadda",
        "Chichawatni",
        "Chilas",
        "Chiniot",
        "Chishtian Mandi",
        "Chitral",
        "Dadu",
        "Darra A,dam Khel",
        "Daska",
        "Dera Ghazi Khan",
        "Dera Ismail Khan",
        "Faisalabad",
        "Ghanche",
        "Ghizer",
        "Gilgit",
        "Gojra",
        "Gujranwala",
        "Gujrat",
        "Gwadar",
        "Hafizabad",
        "Hala",
        "Hangu",
        "Haripur",
        "Hasilpur",
        "Haveli lakha",
        "Hyderabad",
        "Islamabad",
        "Jacobabad",
        "Jamrud",
        "Jamshoro",
        "Jandola",
        "Jaranwala",
        "Jhang Sadar",
        "Jhelum",
        "Jiwani",
        "Kalat",
        "Kamoke",
        "Kandhura",
        "Karachi",
        "Karak",
        "Kasur",
        "Khairpur",
        "Khanewal",
        "Khanpur",
        "Khaplu",
        "Khushab",
        "Khuzdar",
        "Kohat",
        "Kohistan",
        "Kot Addu",
        "Lahore",
        "Lakki Marwat",
        "Landi Kotal",
        "Larkana",
        "Lasbela",
        "Layyah",
        "Lower Dir",
        "Malakand",
        "Mandi Bahauddin",
        "Mansehra",
        "Mardan",
        "Mianwali",
        "Mingaora",
        "Miram Shah",
        "Mirpur",
        "Mirpur Khas",
        "Mithi",
        "Multan",
        "Muridike",
        "Muzaffarabad",
        "Muzaffargarh",
        "Nawabshah",
        "Nowshera",
        "Okara",
        "Ormara",
        "Pakpattan",
        "Parachinar",
        "Pasni",
        "Peshawar",
        "Pirmahal",
        "Punjab",
        "Quetta",
        "Rahimyar Khan",
        "Ratodero",
        "Rawalpindi",
        "Sadiqabad",
        "Safdar Abad",
        "Sahiwal",
        "Sargodha",
        "Shangla",
        "Sheikhüpura",
        "Shikarpur",
        "Sialkot",
        "Sindh",
        "Skardu",
        "Sukkar",
        "Sukkur",
        "Swabi",
        "Swat",
        "Tando Adam",
        "Tank",
        "Thatta",
        "Toba Tek singh",
        "Torkham",
        "Upper Dir",
        "Vehari",
        "Wah",
        "Wana",
        "Wazirabad",
      ],
    },
    documants: {
      type: String,
      require: true,
      enum: ["Original", "Duplicate"],
    },
    assembly: {
      type: String,
      require: true,
      enum: ["Local", "Imported"],
    },
    transmission: {
      type: String,
      require: true,
      enum: ["Automatic", "Manual"],
    },
    features: {
      type: String,
      require: true,
      enum: [
        "ABS",
        "Air Bags",
        "Air Conditioning",
        "Alloy Rims",
        "AM/FM Radio",
        "CD Player",
        "Cassette Player",
        "Cool Box",
        "Cruise Control",
        "Climate Control",
        "DVD Player",
        "Front Speakers",
        "Front Camera",
        "Heated Seats",
        "Immobilizer Key",
        "Keyless Entry",
        "Navigation System",
        "Power Locks",
        "Power Mirrors",
        "Power Steering",
        "Power Windows",
        "Rear Seat Entertainment",
        "Rear AC Vents",
        "Rear speakers",
        "Rear Camera",
        "Sun Roof",
        "Steering Switches",
        "USB and Auxillary Cable",
      ],
    },
    condition: {
      type: String,
      require: true,
      enum: ["New", "Used"],
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: { type: String, require: true },
      coordinates: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isFeaturedData: {
      type: Date,
    },
    pics: {
      type: Array,
      require: true,
    },
  },
  { timestamps: true }
);
CarSchema.pre("save", function (next) {
  if (this.isModified("isFeatured") && this.isFeatured === true) {
    this.isFeaturedData = new Date();
  }
  next();
});

const Car = mongoose.model("Car", CarSchema);

module.exports = {
  Car,
};