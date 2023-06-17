//:(((
document.addEventListener("DOMContentLoaded", () => {

    //export
    const exportToggle = document.getElementById("export-toggle");
    const exportPanel = document.getElementById("export-panel");


    exportToggle.addEventListener("click", async () => {
        exportPanel.classList.toggle("hidden");
        if (!exportPanel.classList.contains("hidden")) {
            initializePage();
            const exportForm = document.getElementById("export-form");
            exportForm.addEventListener("submit", handleExportSubmit);

        }
    });

    //import
    const importToggle = document.getElementById("import-toggle");
    const fileInput = document.getElementById("file-input");
    importToggle.addEventListener("click", async () => {
        try {
            //it is defined >:(
            const loggedUser = await getLoggedUser();

            if (loggedUser.is_admin) {
                fileInput.click();
                console.log("welcome admin hehehe");
            } else {
                console.error("User does not have admin privileges");
                alert("You do not have permission to import animal data");
            }
        } catch (error) {
            console.error("Error checking user admin:", error);
            alert("Error checking user admin. Please try again.");
        }
    });

    fileInput.addEventListener("change", handleFileSelect);
});

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const extension = getFileExtension(file.name);

        if (extension === "json") {
            handleJsonFile(file);
        } else if (extension === "xml") {
            handleXmlFile(file);
        } else {
            console.error("Unsupported file format");
            alert('Unsupported file format');
        }
    }
}

function handleJsonFile(file) {
    const reader = new FileReader();

    reader.onload = function (event) {
        try {
            const animalData = JSON.parse(event.target.result);
            validateAnimalDataJSON(animalData);
            importAnimalData(animalData);
            console.log('Imported animal');
            alert('Imported animal JSON.');
        } catch (error) {
            console.error("Error parsing JSON file:", error);
            alert('Couldn\'t import animal JSON.');
        }
    };

    reader.readAsText(file);
}


function handleXmlFile(file) {
    // xml file parse
}

function validateAnimalDataJSON(animalData) {
    const requiredColumns = [
        "id",
        "animal_class",
        "common_name",
        "scientific_name",
        "habitat",
        "lifestyle",
        "diet",
        "weight",
        "height",
        "region",
        "lifespan",
        "skin_type",
        "animal_status",
        "fun_fact1",
        "fun_fact2",
        "about_text"
    ];

    const missingColumns = [];

    for (const column of requiredColumns) {
        if (!Object.prototype.hasOwnProperty.call(animalData, column)) {
            missingColumns.push(column);
        }
    }

    if (missingColumns.length > 0) {
        throw new Error(
            `Missing required columns in animal data: ${missingColumns.join(", ")}`
        );
    }
}

function importAnimalData(animalData) {
    const jwtToken = localStorage.getItem("token");

    fetch("/api/insertAni", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(animalData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to import animal data");
            }
            console.log("Animal data imported successfully");
        })
        .catch((error) => {
            console.error("Error importing animal data:", error);
        });
}

function getFileExtension(filename) {
    return filename.split(".").pop().toLowerCase();
}

////////////////////////////////////////////////////////////////////////////////////////////////


async function initializePage() {
    const animalSelect = document.getElementById('animal-select');

    try {
        const animalNames = await fetchAnimalNames();

        console.log(animalNames)
        animalNames.forEach(animal => {
            const option = document.createElement('option');
            option.value = animal.id;
            option.textContent = animal.common_name;
            animalSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching animal names:', error);
    }

    async function fetchAnimalNames() {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/animalNames', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const animalNames = await response.json();
                return animalNames;
            } else {
                throw new Error('Failed to fetch animal names');
            }
        } catch (error) {
            console.error('Error fetching animal names:', error);
            throw error;
        }
    }
}

async function handleExportSubmit(event) {
    event.preventDefault();

    const animalSelect = document.getElementById('animal-select');
    const selectedAnimal = animalSelect.value;
    const formatR = document.querySelector('input[name="format"]:checked');

    if (!selectedAnimal || !formatR) {
        console.error('Please select an animal and a format');
        return;
    }

    const format = formatR.value;

    console.log('id should be ' + selectedAnimal);
    if (format === 'json') {
        downloadAnimalJson(selectedAnimal);
    } else if (format === 'xml') {
        //console.log('xml file');
        downloadAnimalXml(selectedAnimal);
    }
}

function downloadAnimalJson(animalId) {
    const token = localStorage.getItem('token');
    const url = `/api/animalJSON/${animalId}`;

    fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch animal JSON');
            }
            return response.json();
        })
        .then(exportedData => {
            const { fileName, fileContent } = exportedData;
            const blob = new Blob([fileContent], { type: 'application/json' });

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, fileName);
            } else {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
                URL.revokeObjectURL(link.href);
            }
            alert('Animal JSON file exported successfully!');
        })
        .catch(error => {
            console.error('Error downloading animal JSON:', error);
            alert('Error exporting animal JSON. Please try again.');

        });
}

function downloadAnimalXml(animalId) {
    const token = localStorage.getItem('token');
    const url = `/api/animalXML/${animalId}`;

    return fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch animal XML');
            }
            const indexFileName = response.headers.get('Content-Disposition').indexOf('filename=');
            let fileName = response.headers.get('Content-Disposition').substring(indexFileName + 9).trim();
            fileName = fileName.substring(1, fileName.length - 1);

            return response.text().then(fileContent => {
                return { fileName, fileContent };
            });
        })
        .then(({ fileName, fileContent }) => {
            const blob = new Blob([fileContent], { type: 'application/xml' });

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, fileName);
            } else {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
                URL.revokeObjectURL(link.href);
            }
            alert('Animal XML file exported successfully!');
        })
        .catch(error => {
            console.error('Error downloading animal XML:', error);
            alert('Error exporting animal XML. Please try again.');
        });

}