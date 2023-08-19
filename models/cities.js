const mongoose = require("mongoose");

const CitiesSchema = new mongoose.Schema({
  region: {
    type: String,
    // enum: [
    //   "Azad Kashmir, Pakistan",
    //   "Balochistan, Pakistan",
    //   "Islamabad Capital Territory, Pakistan",
    //   "Khyber Pakhtunkhwa, Pakistan",
    //   "Northern Areas, Pakistan",
    //   "Punjab, Pakistan",
    //   "Sindh, Pakistan",
    // ],
  },
  chooseCity: {
    type: String,
    // enum: [
    //   "Bagh, Azad Kashmir",
    //   "Barnala(Azad Kashmir), Azad Kashmir",
    //   "Bhimber, Azad Kashmir",
    //   "Kotli, Azad Kashmir",
    //   "Mirpur, Azad Kashmir",
    //   "Muzaffarabad, Azad Kashmir",
    //   "Neelum, Azad Kashmir",
    //   "Pallandri, Azad Kashmir",
    //   "Poonch, Azad Kashmir",
    //   "Rawalakot, Azad Kashmir",
    //   "Sudhnoti, Azad Kashmir",

    //   "Awaran, Balochistan",
    //   "Chaghi, Balochistan",
    //   "Gaddani, Balochistan",
    //   "Gwadar, Balochistan",
    //   "Hub Chowki, Balochistan",
    //   "Kalat, Balochistan",
    //   "Khuzdar, Balochistan",
    //   "Lasbela, Balochistan",
    //   "Loralai, Balochistan",
    //   "Makran, Balochistan",
    //   "Nasirabad, Balochistan",
    //   "Quetta, Balochistan",
    //   "Sibi, Balochistan",
    //   "Turbat, Balochistan",
    //   "Zhob, Balochistan",

    //   "Abbottabad, Khyber Pakhtunkhwa",
    //   "Ali Masjid, Khyber Pakhtunkhwa",
    //   "Balakot, Khyber Pakhtunkhwa",
    //   "Bannu, Khyber Pakhtunkhwa",
    //   "Batagram, Khyber Pakhtunkhwa",
    //   "Batkhela, Khyber Pakhtunkhwa",
    //   "Buner, Khyber Pakhtunkhwa",
    //   "Charsadda, Khyber Pakhtunkhwa",
    //   "Chitral, Khyber Pakhtunkhwa",
    //   "Dera Ismail Khan, Khyber Pakhtunkhwa",
    //   "Dobian, Khyber Pakhtunkhwa",
    //   "FATA, Khyber Pakhtunkhwa",
    //   "Gadoon, Khyber Pakhtunkhwa",
    //   "Galyat, Khyber Pakhtunkhwa",
    //   "Hangu, Khyber Pakhtunkhwa",
    //   "Haripur, Khyber Pakhtunkhwa",
    //   "Jandola, Khyber Pakhtunkhwa",
    //   "Kaghan, Khyber Pakhtunkhwa",
    //   "Karak, Khyber Pakhtunkhwa",
    //   "Kohat, Khyber Pakhtunkhwa",
    //   "Kohistan, Khyber Pakhtunkhwa",
    //   "Laki Marwat, Khyber Pakhtunkhwa",
    //   "Landi Kotal, Khyber Pakhtunkhwa",
    //   "Lower Dir, Khyber Pakhtunkhwa",
    //   "Malakand, Khyber Pakhtunkhwa",
    //   "Mansehra, Khyber Pakhtunkhwa",
    //   "Mardan, Khyber Pakhtunkhwa",
    //   "Mingaora, Khyber Pakhtunkhwa",
    //   "Miram Shah, Khyber Pakhtunkhwa",
    //   "Naran, Khyber Pakhtunkhwa",
    //   "Nowshera, Khyber Pakhtunkhwa",
    //   "Parachinar, Khyber Pakhtunkhwa",
    //   "Peshawar, Khyber Pakhtunkhwa",
    //   "Shabqadar, Khyber Pakhtunkhwa",
    //   "Shangla, Khyber Pakhtunkhwa",
    //   "Swabi, Khyber Pakhtunkhwa",
    //   "Swat, Khyber Pakhtunkhwa",
    //   "Tank, Khyber Pakhtunkhwa",
    //   "Torkham, Khyber Pakhtunkhwa",
    //   "Upper Dir, Khyber Pakhtunkhwa",
    //   "Wana, Khyber Pakhtunkhwa",
    //   "Waziristan, Khyber Pakhtunkhwa",

    //   "Astore, Northern Areas",
    //   "Chilas, Northern Areas",
    //   "Ghanche, Northern Areas",
    //   "Ghizer, Northern Areas",
    //   "Gilgit, Northern Areas",
    //   "Hunza, Northern Areas",
    //   "Khaplu, Northern Areas",
    //   "Skardu, Northern Areas",

    //   "Abdul Hakim, Punjab",
    //   "Ahmadpur East, Punjab",
    //   "Alipur, Punjab",
    //   "Arifwala, Punjab",
    //   "Attock, Punjab",
    //   "Bahawalnagar, Punjab",
    //   "Bahawalpur, Punjab",
    //   "Bhakkar, Punjab",
    //   "Bhalwal, Punjab",
    //   "Burewala, Punjab",
    //   "Chakwal, Punjab",
    //   "Chichawatni, Punjab",
    //   "Chiniot, Punjab",
    //   "Chishtian Mandi, Punjab",
    //   "Chishtian Sharif, Punjab",
    //   "Choa Saidan Shah, Punjab",
    //   "Chunian, Punjab",
    //   "Daska, Punjab",
    //   "Depalpur, Punjab",
    //   "Dera Ghazi Khan, Punjab",
    //   "Dijkot, Punjab",
    //   "Dina, Punjab",
    //   "Duniya Pur, Punjab",
    //   "Faisalabad, Punjab",
    //   "Fateh Jang, Punjab",
    //   "Ghakhar, Punjab",
    //   "Gojra, Punjab",
    //   "Gujar Khan, Punjab",
    //   "Gujranwala, Punjab",
    //   "Gujrat, Punjab",
    //   "Hafizabad, Punjab",
    //   "Harappa, Punjab",
    //   "Haroonabad, Punjab",
    //   "Hasan Abdal, Punjab",
    //   "Hasilpur, Punjab",
    //   "Haveli lakha, Punjab",
    //   "Hazro, Punjab",
    //   "Hujra Shah Muqeem, Punjab",
    //   "Jahanian, Punjab",
    //   "Jalal Pur Jatta, Punjab",
    //   "Jampur, Punjab",
    //   "Jatoi, Punjab",
    //   "Jauharabad, Punjab",
    //   "Jhang, Punjab",
    //   "Jhelum, Punjab",
    //   "Kabirwala, Punjab",
    //   "Kahror Pakka, Punjab",
    //   "Kamalia, Punjab",
    //   "Kamoke, Punjab",
    //   "Kasur, Punjab",
    //   "Khanewal, Punjab",
    //   "Khanpur, Punjab",
    //   "Kharian, Punjab",
    //   "Khushab, Punjab",
    //   "Kot Addu, Punjab",
    //   "Lahore, Punjab",
    //   "Lala Musa, Punjab",
    //   "Layyah, Punjab",
    //   "Liaquatpur, Punjab",
    //   "Lodhran, Punjab",
    //   "Mailsi, Punjab",
    //   "Mandi Bahauddin, Punjab",
    //   "Mangla, Punjab",
    //   "Mian Chunnu, Punjab",
    //   "Mianwali, Punjab",
    //   "Mitha Tiwana, Punjab",
    //   "Multan, Punjab",
    //   "Muridike, Punjab",
    //   "Murree, Punjab",
    //   "Muzaffargarh, Punjab",
    //   "Nankana Sahib, Punjab",
    //   "Narowal, Punjab",
    //   "Nasar Ullah Khan Town, Punjab",
    //   "Okara, Punjab",
    //   "Pakpattan, Punjab",
    //   "Pasrur, Punjab",
    //   "Pattoki, Punjab",
    //   "Pind Dadan Khan, Punjab",
    //   "Pindi Bhattian, Punjab",
    //   "Pirmahal, Punjab",
    //   "Rahimyar Khan, Punjab",
    //   "Raiwind, Punjab",
    //   "Rajana, Punjab",
    //   "Rajanpur, Punjab",
    //   "Ratwal, Punjab",
    //   "Rawalpindi, Punjab",
    //   "Renala Khurd, Punjab",
    //   "Sadiqabad, Punjab",
    //   "Sahiwal, Punjab",
    //   "Samundri, Punjab",
    //   "Sangla Hill, Punjab",
    //   "Sarai Alamgir, Punjab",
    //   "Sargodha, Punjab",
    //   "Shahkot, Punjab",
    //   "Shakargarh, Punjab",
    //   "Shehr Sultan, Punjab",
    //   "Sheikhüpura, Punjab",
    //   "Sher Garh, Punjab",
    //   "Shorkot, Punjab",
    //   "Sialkot, Punjab",
    //   "Talagang, Punjab",
    //   "Taxila, Punjab",
    //   "Toba Tek singh, Punjab",
    //   "Vehari, Punjab",
    //   "Wah, Punjab",
    //   "Wazirabad, Punjab",
    //   "Yazman, Punjab",

    //   "Badin, Sindh",
    //   "Dadu, Sindh",
    //   "Daharki, Sindh",
    //   "Daur, Sindh",
    //   "Gaarho, Sindh",
    //   "Gambat, Sindh",
    //   "Gharo, Sindh",
    //   "Ghotki, Sindh",
    //   "Hala, Sindh",
    //   "Hyderabad, Sindh",
    //   "Jacobabad, Sindh",
    //   "Jamshoro, Sindh",
    //   "Kandiaro, Sindh",
    //   "Karachi, Sindh",
    //   "Khairpur, Sindh",
    //   "Khipro, Sindh",
    //   "Kotri, Sindh",
    //   "Larkana, Sindh",
    //   "Matiari, Sindh",
    //   "Matli, Sindh",
    //   "Mirpur Khas, Sindh",
    //   "Mirpur Sakro, Sindh",
    //   "Moro, Sindh",
    //   "Naushahro Feroze, Sindh",
    //   "Nawabshah, Sindh",
    //   "Qazi Ahmed, Sindh",
    //   "Ratodero, Sindh",
    //   "Rohri, Sindh",
    //   "Sakrand, Sindh",
    //   "Sanghar, Sindh",
    //   "Sehwan Sharif, Sindh",
    //   "Shahdadpur, Sindh",
    //   "Shahpur Chakar, Sindh",
    //   "Shikarpur, Sindh",
    //   "Sujawal, Sindh",
    //   "Sukkur, Sindh",
    //   "Tando Adam, Sindh",
    //   "Tando Allahyar, Sindh",
    //   "Tando Bago, Sindh",
    //   "Tando Muhammad Khan, Sindh",
    //   "Tharparkar, Sindh",
    //   "Thatta, Sindh",
    //   "Umerkot, Sindh",
    // ],
  },
});
