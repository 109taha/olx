const Joi = require("joi");

const MobilePhoneSchema = Joi.object({
  title: Joi.string().required(),

  description: Joi.string().required(),

  brand: Joi.string()
    .valid(
      "Apple",
      "Samsung",
      "Google",
      "OnePlus",
      "Tecno",
      "Infinix",
      "Xiaomi",
      "Realme",
      "Nokia",
      "Motorola",
      "BlackBerry",
      "LG",
      "Asus",
      "Acer",
      "Sony",
      "QMobile",
      "Huawei",
      "Vivo",
      "BLU",
      "Alcatel",
      "ZTE ",
      "Oppo",
      "Micromax",
      "HTC",
      "Honor",
      "Lenovo",
      "Celkon",
      "Philips"
    )
    .required(),

  condition: Joi.string()
    .valid("New", "Used", "Box Open", "Refurbished", "For Parts Not Working")
    .required(),

  price: Joi.number().required(),

  latitude: Joi.number().when("zipcode", {
    is: undefined,
    then: Joi.required(),
  }),

  longitude: Joi.number().when("zipcode", {
    is: undefined,
    then: Joi.required(),
  }),

  isFeatured: Joi.boolean().required(),

  attachArtwork: Joi.string(),
}).unknown(true);

const validMobileSchema = (req, res, next) => {
  const { error } = MobilePhoneSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error });
  } else {
    next();
  }
};

const BikeSchema = Joi.object({
  title: Joi.string().required(),

  description: Joi.string().required(),

  maker: Joi.string()
    .valid(
      "Honda",
      "Yamaha",
      "Suzuki",
      "United",
      "Road Prince",
      "Unique",
      "Super Power",
      "Super Star",
      "Metro",
      "Crown",
      "Kawasaki",
      "Power",
      "Ravi",
      "Eagle",
      "Habib",
      "Ghani",
      "Sohrab",
      "Benelli",
      "Derbi",
      "Zongshen",
      "CF Moto",
      "Cineco",
      "Qingqi",
      "Hero",
      "Hi Speed",
      "Lifan",
      "Pak Hero",
      "Safari",
      "Super Asia",
      "Toyo",
      "Treet",
      "Union Star"
    )
    .required(),

  year: Joi.number().required(),

  KMsDriven: Joi.number().required(),

  condition: Joi.string()
    .valid("New", "Used", "Box Open", "Refurbished", "For Parts Not Working")
    .required(),

  price: Joi.number().required(),

  latitude: Joi.number().when("zipcode", {
    is: undefined,
    then: Joi.required(),
  }),

  longitude: Joi.number().when("zipcode", {
    is: undefined,
    then: Joi.required(),
  }),

  isFeatured: Joi.boolean().required(),

  attachArtwork: Joi.string(),
}).unknown(true);

const validBikeSchema = (req, res, next) => {
  const { error } = BikeSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error });
  } else {
    next();
  }
};

const CarSchema = Joi.object({
  title: Joi.string().required(),

  description: Joi.string().required(),

  maker: Joi.string()
    .valid(
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
      "Other Brands"
    )
    .required(),

  model: Joi.string()
    .valid(
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
      "Wagon R Stingray"
    )
    .required(),

  year: Joi.number().required(),

  KMsDriven: Joi.number().required(),

  fuel: Joi.string()
    .valid("Petrol", "Diesel", "LPG", "CNG", "Hybrid", "Electric")
    .required(),

  registrationCity: Joi.string()
    .valid(
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
      "Wazirabad"
    )
    .required(),

  documants: Joi.string().valid("Original", "Duplicate").required(),

  assembly: Joi.string().valid("Local", "Imported").required(),

  transmission: Joi.string().valid("Automatic", "Manual").required(),

  features: Joi.string()
    .valid(
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
      "USB and Auxillary Cable"
    )
    .required(),

  condition: Joi.string()
    .valid("New", "Used", "Box Open", "Refurbished", "For Parts Not Working")
    .required(),

  price: Joi.number().required(),

  latitude: Joi.number().when("zipcode", {
    is: undefined,
    then: Joi.required(),
  }),

  longitude: Joi.number().when("zipcode", {
    is: undefined,
    then: Joi.required(),
  }),

  isFeatured: Joi.boolean().required(),

  attachArtwork: Joi.string(),
}).unknown(true);

const validCarSchema = (req, res, next) => {
  const { error } = CarSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error });
  } else {
    next();
  }
};

module.exports = { validMobileSchema, validBikeSchema, validCarSchema };
