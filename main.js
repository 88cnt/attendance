window.onload = function () {
    const inputElement = document.getElementById("file");
    const searchElement = document.getElementById("search");
    const result = document.getElementById("result")
    var names = [];

    if (inputElement) {
        inputElement.addEventListener("change", handleFiles, false);
    }
    if (searchElement) {
        searchElement.addEventListener("input", searchFunc, false)
    }

    function handleFiles() {
        names = [];
        const fileList = this.files;
        searchElement.value = "";
        for (let file of fileList) {
            let reader = new FileReader();
            let table = document.getElementById("table")
            reader.readAsText(file)
            reader.onloadend = () => {
                table.innerHTML = "";
                for (let row of CSV.parse(reader.result)) {
                    if (row[0] == "Name (Original Name)") {
                        continue;
                    }
                    else {
                        let tr = table.insertRow();
                        let td = tr.insertCell();
                        td.innerHTML = row[0]
                        names.push(row[0])
                    }
                }
            }
        }

        searchElement.focus()

    }

    function searchFunc() {
        let val = searchElement.value;
        table.innerHTML = "";
        let result_ct = 0;
        for (let name of names) {
            if (name.toLowerCase().includes(val.toLowerCase())) {
                let tr = table.insertRow();
                let td = tr.insertCell();
                td.innerHTML = name
                result_ct++;
            }
        }
        result.innerHTML = result_ct + " results";
    }
}
