const fs = require('fs');
const path = require('path');

const filesToUpdate = [
    "routes/Routers.jsx",
    "pages/Signup.jsx",
    "pages/Home.jsx",
    "pages/Providers/Providers.jsx",
    "pages/Providers/ProviderDetails.jsx",
    "pages/Providers/ProviderAbout.jsx",
    "components/Services/ServiceCard.jsx",
    "components/Header/Header.jsx",
    "components/Footer/Footer.jsx",
    "components/Providers/ProviderList.jsx",
    "components/Providers/ProviderCard.jsx",
    "assets/data/providers.js"
];

const basePath = `C:\\Users\\Rounak\\OneDrive\\Desktop\\project\\extracted\\Service-booking-app-main\\Service-booking-app-main\\frontend\\src`;

filesToUpdate.forEach(file => {
    const fullPath = path.join(basePath, file);
    if(fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Replace imports and names
        content = content.replace(/Doctors\/Doctors/g, "Providers/Providers");
        content = content.replace(/Doctors\/DoctorDetails/g, "Providers/ProviderDetails");
        content = content.replace(/Doctors\/DoctorAbout/g, "Providers/ProviderAbout");
        content = content.replace(/Doctors\/DoctorList/g, "Providers/ProviderList");
        content = content.replace(/Doctors\/DoctorCard/g, "Providers/ProviderCard");
        content = content.replace(/Doctors/g, "Providers");
        content = content.replace(/DoctorDetails/g, "ProviderDetails");
        content = content.replace(/DoctorAbout/g, "ProviderAbout");
        content = content.replace(/DoctorList/g, "ProviderList");
        content = content.replace(/DoctorCard/g, "ProviderCard");
        content = content.replace(/Doctor/g, "Provider");
        
        content = content.replace(/\/doctors/g, "/providers");
        content = content.replace(/doctors\.js/g, "providers.js");
        content = content.replace(/doctors/g, "providers");
        content = content.replace(/doctor/g, "provider");

        fs.writeFileSync(fullPath, content);
        console.log(`Updated: ${file}`);
    } else {
        console.log(`File not found: ${fullPath}`);
    }
});
