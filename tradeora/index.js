const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

const axios = require('axios').default;

const gstPaid= {
    "GSTTotal": {
       "AssessmentYear": {
         "year":"2019",
           "monthlyGST":{
             "jan":30000,
             "feb":28500,
             "mar":32100,
             "apr":29724,
             "may":31200,
             "jun":32100,
             "jul":30100,
             "aug":30200,
             "sep":30300,
             "oct":30400,
             "nov":30500,
             "dec":30900
           }
       }
     }
}



const itr3 = {
   "AssessmentYear": "2019",
   "AssessmentDate": "2020-05-04",
   "CreationInfo": {
      "SWVersionNo": "R5",
      "SWCreatedBy": "SK12345678",
      "XMLCreatedBy": "SK12345678",
      "XMLCreationDate": "2018-06-15",
      "IntermediaryCity": "CHENNAI",
      "Digest": "A2n72D0m5WomyXppYOBGqHRkZ9PDZi88p0L1XACBi9s="
   },
   "PersonalInfo": {
      "AssesseeName": {
         "FirstName": "KIRAN",
         "SurNameOrOrgName": "SELVAN"
      },
      "PAN": "ACMEN12345",
      "Address": {
         "ResidenceNo": "HNO 3-5-118/6/2,THIRD FLR",
         "RoadOrStreet": "THIRD FLR,KRISHNA NAGAR ,GANDHI NGR CLNY",
         "LocalityOrArea": "CHROMEPET",
         "CityOrTownOrDistrict": "CHENNAI",
         "StateCode": "33",
         "CountryCode": "91",
         "PinCode": "600058",
         "CountryCodeMobile": "91",
         "MobileNo": "9884518410",
         "EmailAddress": "krisat3003@gmail.com",
         "EmailAddressSec": "finance21consulting@gmail.com"
      },
      "DOB": "1981-07-11",
      "AadhaarCardNo": "50350882045"
   },
   "AuditInfo": {
      "AuditReportFurnishDate": "2018-06-04",
      "AuditorName": "CA SUNDAR K",
      "AuditorMemNo": "023835",
      "AudFrmName": "CA SUNDAR K",
      "AudFrmRegNo": "00012345",
      "AudFrmPAN": "SKBNC54321",
      "AuditDate": "2018-06-04"
   },
   "NatOfBus": {
      "NatureOfBusiness": {
         "Code": "04045",
         "TradeName1": "ACME Nutraceuticals"
      }
   },
   "SummaryFinancials": {
      "BalanceSheet": {
         "StockInTrade": "200000",
         "Recievables": "400000",
         "CashAndBankBalance": "100000",
         "Payables": "200000"
      },
      "ProfitAndLoss": {
         "GrossSales": "2000000",
         "Purchases": "1200000",
         "OtherDirectCosts": "0",
         "GrossProfit": "800000",
         "Expenses": null,
         "NetProfit": null
      }
   }
 };

const billOfLading = {
    "isValid": true,
	"negotiable": false,
	"billOfLadingNumber": "TestBoL1002CFS",
	"consignor": {
		"name": "Testconsignor1",
		"printedParty": "Test Consignor Printed Party1 STREET ADDRESS City,03039"
	},
	"consignee": {
		"name": "Testconsignee1",
		"registeredForVAT": false
	},
	"notifyParties": [{
		"name": "TestNotifyParty1",
		"registeredForVAT": false
	}],
	"otherParties": [{
		"name": "TestOtherPartyName1",
		"registeredForVAT": false
	}],
	"declarationofInterest": false,
	"particulars": [{
		"grossWeight": {
			"unit": "KG",
			"oceanCarrierCode": "TSTC",
			"freightedAtAd": false
		}
	}]
}

const maritimeRoutes = {
   Mumbai: {
      Singapore: 10,
      SanFrancisco: 40,
      Manzanillo: 46,
      Antofagasta: 50,
      CapeTown: 19,
      NewYork: 87
   }
}

const voyagePercentageCompleted = {
   241312000: 0.56,
   477524100: 0.23,
   477203100: 0.17
}

app.post('/verify/billOfLading', (req, res) => {

   console.log('processing BL verification.. Reference implementation based on the TRADELENS developer portal references ');

   console.log(req.body);
   billOfLading.billOfLadingNumber = req.body.billOfLadingNumber;
   billOfLading.oceanCarrierCode = req.body.oceanCarrierCode;
   billOfLading.consignor.printedParty = req.body.consignorPrintedParty;
   res.send(billOfLading);

})

/*

Bill of Lading number: TestBoL1002CFS
Ocean carrier code (SCAC code): TSTC
Consignor printed party: Test Consignor Printed Party1 STREET ADDRESS City, 03039, Country

*/

app.get('/financials', (req, res) => {

   var riskReduction = 0

   const lastYearAudited = itr3.AssessmentYear
   const lastYearAuditedIsPreviousYear = lastYearAudited === "2019"

   if (lastYearAuditedIsPreviousYear){
      const loanAmount = parseInt(req.query.loanAmount)
      const grossSales = parseInt(itr3.SummaryFinancials.ProfitAndLoss.GrossSales)
      const grossSalesToLoanAmount_ratio = grossSales / loanAmount
      const ratioIsGreaterThan4 = grossSalesToLoanAmount_ratio > 4
      riskReduction = ratioIsGreaterThan4 ? 30 : 10
   }

   res.send({ riskReduction });
})

app.post('/billOfLading', (req, res) => {

   var riskReduction = 0

   billOfLading.billOfLadingNumber = req.body.billOfLadingNumber;
   billOfLading.oceanCarrierCode = req.body.oceanCarrierCode;
   billOfLading.consignor.printedParty = req.body.consignorPrintedParty;
   riskReduction = billOfLading ? 20 : 0

   res.send({ riskReduction });
})

app.get('/vessel', (req, res) => {

   var riskReduction = 0
   const { portOfOrigin, portOfDestination, loanDuration, mmsi } = req.query

   const voyageDuration = maritimeRoutes[portOfOrigin][portOfDestination]
   const loanPeriodShorterThanVoyage = loanDuration < voyageDuration
   riskReduction = loanPeriodShorterThanVoyage ? 10 : 0

   const isPastHalfVoyage = voyagePercentageCompleted[mmsi] > 0.5
   riskReduction = isPastHalfVoyage ? riskReduction + 10 : riskReduction

   console.log({ portOfOrigin, portOfDestination, voyageDuration })
   console.log({ loanDuration, loanPeriodShorterThanVoyage })
   console.log({ isPastHalfVoyage })

   const url = 'https://services.marinetraffic.com/api/exportvessel/v:5/dbd87f37b7890047b923aade1004987a7b0e862c/timespan:2000/protocol:jsono/mmsi:' + mmsi

   axios({ method: 'get', url }).then((response) => {

      let status = parseInt(response.data[0].STATUS)
      console.log(status)
      riskReduction = status === 0 ? riskReduction + 10 : riskReduction

      res.send({ riskReduction });
   })
   .catch(console.log)
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
