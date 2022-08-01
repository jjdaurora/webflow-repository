const table = document.getElementsByClassName("points-table")[0]

fetch(
    'https://api.airtable.com/v0/appzvtjAGocJzOExM/Member.Bets?filterByFormula=NOT({Member ID}!='+JSON.stringify(JSON.parse(localStorage.getItem('memberstack')).information.id)+')'+'&'+'view=viwu4bRexruFsAMi1', {
        headers: {Authorization: 'Bearer keyzsJA5PVzv64Oem'}
    })
      .then( resp => resp.json() )
      .then( json => {

        let balance = 0 

        json.records.forEach(f => {
            balance += f.fields.Value
            let tr = document.createElement("tr")

            table.prepend(tr)

            let betDate = new Date(f.fields['Selection Date'])
            betDate.toISOString().split('T')[0]
            const offset = betDate.getTimezoneOffset()
            betDate = new Date(betDate.getTime() - (offset*60*1000))

            let td_date = document.createElement("td")
            td_date.setAttribute("scope", "row")
            td_date.setAttribute("data-label", "Date")
            td_date.innerHTML = betDate.toISOString().split('T')[0]
            tr.appendChild(td_date)

            let td_question = document.createElement("td")
            td_question.setAttribute("scope", "row")
            td_question.setAttribute("data-label", "Question")
            td_question.innerHTML = f.fields['Question (from carddata)'] || ""
            tr.appendChild(td_question)
            

            let td_yn = document.createElement("td")
            td_yn.setAttribute("scope", "row")
            td_yn.setAttribute("data-label", "Y/N")

            let td_yn_box = document.createElement("div")

            if (f.fields['Closing Date (from Linked Betting Line ID)'] && f.fields['Closing Date (from Linked Betting Line ID)'][0] && f.fields.Category === "winnings") {
                td_yn_box.setAttribute("style", "background:#00b300 !important;font-weight: bold !important;font-weight: bold !important;height: 100% !important;display: flex !important;width: 100% !important;justify-content: center !important;")
            }

            if (f.fields['Closing Date (from Linked Betting Line ID)'] && f.fields['Closing Date (from Linked Betting Line ID)'][0] && f.fields.Category === "winnings") {
                td_yn_box.setAttribute("style", "background:#00b300 !important;font-weight: bold !important;font-weight: bold;height: 100%;display: flex;width: 100%;justify-content: center;")
            }

            else if (f.fields['Closing Date (from Linked Betting Line ID)'] && f.fields['Closing Date (from Linked Betting Line ID)'][0] && f.fields.Category !== "winnings")  {
                td_yn_box.setAttribute("style", "background:#FF0000;font-weight: bold;font-weight: bold;height: 100%;display: flex;width: 100%;justify-content: center;")
            }
  
            else if (!f.fields['Closing Date (from Linked Betting Line ID)'] || f.fields.Category !== "winnings" ) {
                td_yn_box.setAttribute("style", "background:#EBEBE4;font-weight: bold;font-weight: bold;height: 100%;display: flex;width: 100%;justify-content: center;")
            }

            let td_yn_box_text = document.createElement("p")

            if (f.fields.Choice && (f.fields.Choice === true || f.fields.Choice === "true")) {
                td_yn_box_text.innerHTML = 'YES' 
            }

            else {
                td_yn_box_text.innerHTML = ' NO' 
            }

            tr.appendChild(td_yn)
            td_yn.appendChild(td_yn_box)
            td_yn_box.appendChild(td_yn_box_text)

            let td_points = document.createElement("td")
            td_points.setAttribute("scope", "row")
            td_points.setAttribute("data-label", "Points")
            td_points.innerHTML = f.fields.Value
            tr.appendChild(td_points)

            let td_balance = document.createElement("td")
            td_balance.setAttribute("scope", "row")
            td_balance.setAttribute("data-label", "Balance")
            td_balance.innerHTML = balance
            tr.appendChild(td_balance)
         
        })
    })
.catch(error => {
  console.log(error)
});