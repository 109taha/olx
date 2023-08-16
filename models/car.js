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
      type: String,
      require: true,
      enum: [
        "Suzuki",
        "Toyota",
        "Honda",
        "Daihatsu",
        "Nissan",
        "Adam",
        "Audi",
        "BAIC",
        "Bentley",
        "BMW",
        "Buick",
        "Cadilac",
        "Changan",
        "Chery",
        "Chevrolet",
        "Chrysler",
        "Classic & Antiques",
        "Daewoo",
        "Daihatsu",
        "Datsun",
        "DFSK",
        "Dodge",
        "Dongfeng",
        "FAW",
        "Fiat",
        "Ford",
        "GMC",
        "Haval",
        "Hino",
        "Honda",
        "Hummer",
        "Hyundai",
        "Isuzu",
        "JAC",
        "Jaguar",
        "Jeep",
        "JW Fortland",
        "KIA",
        "Land Rover",
        "Lexus",
        "Mazda",
        "Mercedes",
        "MG",
        "Mitsubishi",
        "Nissan",
        "Peugeot",
        "Porsche",
        "Prince",
        "Proton",
        "Range Rover",
        "Renault",
        "Subaru",
        "Suzuki",
        "Toyota",
        "United",
        "Volkswagen",
        "Other Brands",
      ],
    },
    model: {
      type: String,
      require: true,
      enum: [
        "City IVTEC",
        "Civic VTi Oriel Prosmatec",
        "Civic EXi",
        "City IDSI",
        "City Aspire",
        "Alto",
        "Alto Lapin",
        "APV",
        "Baleno",
        "Bolan",
        "Cappuccino",
        "Carry",
        "Celerio",
        "Cervo",
        "Ciaz",
        "Cultus VX",
        "Cultus VXL",
        "Cultus VXR",
        "Escudo",
        "Every",
        "Every Wagon",
        "FX",
        "Hustler",
        "Ignis",
        "Jimny",
        "Jimny Sierra",
        "Kei",
        "Khyber",
        "Kizashi",
        "Liana",
        "Lj80",
        "Margalla",
        "Mega Carry Xtra",
        "Mehran VX",
        "Mehran VXR",
        "MR Wagon",
        "Palette",
        "Palette Sw",
        "Potohar",
        "Ravi",
        "Samuari",
        "Sj410",
        "Solio",
        "Solio Bandit",
        "Spacia",
        "Swift",
        "Sx4",
        "Twin",
        "Vitara",
        "Wagon R",
        "Wagon R Stingray",
      ],
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
      type: String,
      required: true,
    },
    pics: {
      type: Array,
      require: true,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", CarSchema);

module.exports = {
  Car,
};
