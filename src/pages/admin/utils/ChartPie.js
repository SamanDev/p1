import React,{ useEffect, useState } from "react";
import $ from "jquery";
import Chart from "chart.js/auto";
import { doCurrency,doCurrencyMil } from "../../../const";
import { addDays } from "date-fns";
import { adminGetService } from "../../../services/admin";
const moment = require("moment");
const sumOf = (array) => {
  return array.reduce((sum, currentValue) => {
    try {
      var desc = JSON.parse(currentValue.description);
    } catch (error) {
      var desc = { dollarPrice: 50000 };
    }
    var _am =
      currentValue.endBalance != currentValue.startBalance
        ? currentValue.amount
        : currentValue.amount2 * desc.dollarPrice;
    if (_am < 0) {
      _am = _am*-1;
    }
    return sum + _am;
  }, 0);
};
const groupBy = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};

function RisingPitch(prop) {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(addDays(new Date(), prop.day-1));
  const [endDate, setEndDate] = useState(addDays(new Date(), prop.day));
  const filteredItems = data
    .sort((a, b) => (a.id < b.id ? 1 : -1))
    .filter(
      (item) =>
      item.status != "Canceled" &&
      item.status != "Pending" &&
      (item.gateway != "AdminSystem" ) &&
        (item.gateway || item.mode == "TotalIncome")
    );
    const fetchUsers = async (mode) => {
    
        var _s = moment(startDate).format("YYYY-MM-DD");
        var _e = moment(endDate).format("YYYY-MM-DD");
        try {
       
            const res = await adminGetService(
              `getReports?mode=${mode}&page=1&number=5000&username=&start=${_s}&end=${_e}&gateway=`
            );
          
    
          if (res.status === 200) {
            setData(res.data);
       
    
          }
        } catch (error) {
          
        } finally {
          
        }
      };
      useEffect(() => {
        $("#chart"+prop.mode+prop.day).html("");
        $("#chart"+prop.mode+prop.day).append('<canvas id="acquisitions'+prop.mode+prop.day+'"></canvas>');
        var _gmode = groupBy(filteredItems, "gateway");
        var modedata = [];
        var valdata = [];
        if(filteredItems.length>0){

        
       
        
    for (const property in _gmode) {
      modedata.push(property + " ("+_gmode[property].length+")");
      valdata.push((sumOf(_gmode[property])) )
  
    }
  }else{

  }
        var chartdata = {
          labels: modedata,
          datasets: [{
           
            data: valdata,
            borderWidth: 2,
            backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', '#27AE60', '#884EA0', '#D35400'],
          }]
        };
        //console.log(chartdata)
        new Chart(document.getElementById("acquisitions"+prop.mode+prop.day), {
            type: 'doughnut',
            data: chartdata,
            options: {
              plugins: {
                title: {
                  display: true,
                  text: doCurrencyMil(sumOf(filteredItems)) + " ("+filteredItems.length+")",
                  font: {
                    size: 17,
              
                
                  },
                },
                subtitle: {
                  display: true,
                  text: moment(startDate).format("YYYY-MM-DD"),
                  color: 'blue',
                  font: {
                    size: 12,
                    family: 'tahoma',
                    weight: 'normal',
                
                  },
                  padding: {
                    bottom: 10
                  }
                },
                legend: {
                  display: false,
                 
              }
              }
            }
        });
      
      }, [filteredItems]);
      useEffect(() => {
       // console.log(prop)
        fetchUsers(prop.mode);
      }, []);
     
  return (
    <div
      style={{
        width: "50%",
        margin: "auto",
        display:"inline-block"
      }}
      id={"chart"+prop.mode+prop.day}
    ></div>
  );
}
export default RisingPitch;
