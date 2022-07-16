document.getElementsByClassName("wrapper-section wf-section")[0].style.display = "block"

const list = document.getElementsByClassName("scroll-table-content")[0]
fetch('https://api.airtable.com/v0/appzvtjAGocJzOExM/Member.Bets?filterByFormula=NOT({Member ID}!='+JSON.stringify(JSON.parse(localStorage.getItem('memberstack')).information.id)+')', {
         headers: {Authorization: 'Bearer keyzsJA5PVzv64Oem'}
        })
      .then( resp => resp.json() )
      .then( json => {
        json.records.forEach(f => {
            console.log(f.fields)
            let row = document.createElement("div")
            row.setAttribute("class", "table-row")
            list.appendChild(row)

            let rowNr = document.createElement("div")
      
            let tableBoxName = document.createElement("div")
            tableBoxName.setAttribute("class", "table-box _2")
            row.appendChild(tableBoxName)
            let img = document.createElement("img")
            img.setAttribute("class", "image-35")
            img.setAttribute("width", "32")
            img.setAttribute("sizes", "32px")
            img.setAttribute("src", "https://via.placeholder.com/150")
            let name = document.createElement("div")
            name.setAttribute("class", "table-data name")
            name.innerHTML = f.fields['Selection Date']
            tableBoxName.appendChild(img)
            tableBoxName.appendChild(name)

            let tableBoxQuestion = document.createElement("div")
            tableBoxQuestion.setAttribute("class", "table-box _2")
            row.appendChild(tableBoxQuestion)
            let question = document.createElement("div")
            question.setAttribute("class", "table-data")
            question.innerHTML = "Will Tesla succeed?"
            tableBoxQuestion.appendChild(question)

            let tableBoxBalance = document.createElement("div")
            tableBoxBalance.setAttribute("class", "table-box _2")
            row.appendChild(tableBoxBalance)
            let balance = document.createElement("div")
            balance.setAttribute("class", "table-data")
            balance.innerHTML = f.fields.Choice
            tableBoxBalance.appendChild(balance)

            let tableBoxPending = document.createElement("div")
            tableBoxPending.setAttribute("class", "table-box _2")
            row.appendChild(tableBoxPending)
            let pending = document.createElement("div")
            pending.setAttribute("class", "table-data")
            pending.innerHTML = f.fields.Value
            tableBoxPending.appendChild(pending)

            let tableBoxDate = document.createElement("div")
            tableBoxDate.setAttribute("class", "table-box _2 small")
            row.appendChild(tableBoxDate)
            let date = document.createElement("div")
            date.setAttribute("class", "table-data")
            date.innerHTML = 1000
            tableBoxDate.appendChild(date)    
        })
    })
.catch(error => {
  console.log(error)
});
