import { Formio } from 'formiojs'
import Charts from './charts/Charts.js';
import ColorPickerComponent from './colorpicker/ColorPicker.js';

// // Initialize i18next with desired languages and configurations
// i18next.init({
//    lng: 'en',
//    fallbackLng: 'en',
//    resources: {
//       en: {
//          translation: {
//             'Principal and Interest': 'Principal and Interest',
//             'Monthly Payment': 'Monthly Payment',
//          },
//       },
//       es: {
//          translation: {
//             'Principal and Interest': 'Principal e Interés',
//             'Monthly Payment': 'Pago Mensual',
//          },
//       },
//    },
// });

Formio.use([
   {
      components: {
         charts: Charts
      }
   },
   {
      components: {
         colorpicker: ColorPickerComponent
      }
   }
])

// // Attach the initialized i18next instance to Formio

// Formio.builder(document.getElementById("builder"), {}, {
//    sanitizeConfig: {
//       addTags: ["svg", "path"],
//       addAttr: ["d", "viewBox"]
//    }
// }).then(() => {

// });

// Your form JSON configuration
const formJson = {
   "display": "form",
   "settings": {
   },
   "components": [
      {
         "label": "Columns",
         "columns": [
            {
               "components": [
                  {
                     "title": "Loan Terms",
                     "customClass": "reh-calc-input-panel",
                     "collapsible": true,
                     "key": "loanTerms",
                     "type": "panel",
                     "label": "Panel",
                     "collapsed": false,
                     "input": false,
                     "tableView": false,
                     "components": [
                        {
                           "label": "Columns",
                           "columns": [
                              {
                                 "components": [
                                    {
                                       "label": "Property Value",
                                       "prefix": "$",
                                       "suffix": ".00",
                                       "applyMaskOn": "change",
                                       "mask": false,
                                       "autofocus": true,
                                       "tableView": false,
                                       "delimiter": true,
                                       "requireDecimal": false,
                                       "inputFormat": "plain",
                                       "truncateMultipleSpaces": false,
                                       "clearOnHide": false,
                                       "validate": {
                                          "required": true,
                                          "min": 0,
                                          "max": 999999999
                                       },
                                       "validateWhenHidden": false,
                                       "key": "propertyValue",
                                       "type": "number",
                                       "decimalLimit": 0,
                                       "input": true
                                    },
                                    {
                                       "label": "Down Payment",
                                       "prefix": "$",
                                       "suffix": ".00",
                                       "applyMaskOn": "change",
                                       "mask": false,
                                       "tableView": false,
                                       "delimiter": true,
                                       "requireDecimal": false,
                                       "inputFormat": "plain",
                                       "truncateMultipleSpaces": false,
                                       "clearOnHide": false,
                                       "validate": {
                                          "custom": "valid = (data.downPayment <= data.propertyValue);",
                                          "min": 0,
                                          "max": 999999999
                                       },
                                       "validateWhenHidden": false,
                                       "key": "downPayment",
                                       "type": "number",
                                       "decimalLimit": 0,
                                       "input": true
                                    }
                                 ],
                                 "width": 6,
                                 "offset": 0,
                                 "push": 0,
                                 "pull": 0,
                                 "size": "md",
                                 "currentWidth": 6
                              },
                              {
                                 "components": [
                                    {
                                       "label": "Interest Rate",
                                       "suffix": "%",
                                       "applyMaskOn": "change",
                                       "mask": false,
                                       "tableView": false,
                                       "delimiter": false,
                                       "requireDecimal": false,
                                       "inputFormat": "plain",
                                       "truncateMultipleSpaces": false,
                                       "clearOnHide": false,
                                       "validate": {
                                          "required": true,
                                          "min": 0,
                                          "max": 99
                                       },
                                       "validateWhenHidden": false,
                                       "key": "interestRate",
                                       "type": "number",
                                       "input": true,
                                       "decimalLimit": 3
                                    },
                                    {
                                       "label": "Duration",
                                       "suffix": "Years",
                                       "applyMaskOn": "change",
                                       "mask": false,
                                       "tableView": false,
                                       "delimiter": false,
                                       "requireDecimal": false,
                                       "inputFormat": "plain",
                                       "truncateMultipleSpaces": false,
                                       "validate": {
                                          "required": true,
                                          "min": 0,
                                          "max": 99
                                       },
                                       "validateWhenHidden": false,
                                       "key": "durationYears",
                                       "type": "number",
                                       "decimalLimit": 3,
                                       "input": true
                                    }
                                 ],
                                 "width": 6,
                                 "offset": 0,
                                 "push": 0,
                                 "pull": 0,
                                 "size": "md",
                                 "currentWidth": 6
                              }
                           ],
                           "key": "loanTetmsColumns",
                           "type": "columns",
                           "input": false,
                           "tableView": false
                        }
                     ]
                  },
                  {
                     "title": "Escrow",
                     "customClass": "reh-calc-input-panel",
                     "collapsible": true,
                     "key": "escrow",
                     "type": "panel",
                     "label": "Panel",
                     "collapsed": false,
                     "input": false,
                     "tableView": false,
                     "components": [
                        {
                           "label": "Columns",
                           "columns": [
                              {
                                 "components": [
                                    {
                                       "label": "Annual Taxes",
                                       "prefix": "$",
                                       "suffix": ".00",
                                       "applyMaskOn": "change",
                                       "mask": false,
                                       "tableView": false,
                                       "delimiter": true,
                                       "requireDecimal": false,
                                       "inputFormat": "plain",
                                       "truncateMultipleSpaces": false,
                                       "clearOnHide": false,
                                       "validateWhenHidden": false,
                                       "key": "annualTaxes",
                                       "type": "number",
                                       "input": true,
                                       "decimalLimit": 0
                                    },
                                    {
                                       "label": "Annual Insurance",
                                       "prefix": "$",
                                       "suffix": ".00",
                                       "applyMaskOn": "change",
                                       "mask": false,
                                       "tableView": false,
                                       "delimiter": true,
                                       "requireDecimal": false,
                                       "inputFormat": "plain",
                                       "truncateMultipleSpaces": false,
                                       "clearOnHide": false,
                                       "validateWhenHidden": false,
                                       "key": "annualInsurance",
                                       "type": "number",
                                       "decimalLimit": 0,
                                       "input": true
                                    }
                                 ],
                                 "width": 6,
                                 "offset": 0,
                                 "push": 0,
                                 "pull": 0,
                                 "size": "md",
                                 "currentWidth": 6
                              },
                              {
                                 "components": [
                                    {
                                       "label": "Annual HOA",
                                       "prefix": "$",
                                       "suffix": ".00",
                                       "applyMaskOn": "change",
                                       "mask": false,
                                       "tableView": false,
                                       "delimiter": true,
                                       "requireDecimal": false,
                                       "inputFormat": "plain",
                                       "truncateMultipleSpaces": false,
                                       "clearOnHide": false,
                                       "validateWhenHidden": false,
                                       "key": "annualHoa",
                                       "type": "number",
                                       "decimalLimit": 0,
                                       "input": true
                                    }
                                 ],
                                 "width": 6,
                                 "offset": 0,
                                 "push": 0,
                                 "pull": 0,
                                 "size": "md",
                                 "currentWidth": 6
                              }
                           ],
                           "key": "loanEscrowColumns",
                           "type": "columns",
                           "input": false,
                           "tableView": false
                        }
                     ]
                  },
                  {
                     "customClass": "reh-calc-action",
                     "key": "fieldSet",
                     "type": "fieldset",
                     "label": "Field Set",
                     "input": false,
                     "tableView": false,
                     "components": [
                        {
                           "label": "Want a copy of the results?",
                           "placeholder": "Enter your email address",
                           "applyMaskOn": "change",
                           "tableView": true,
                           "clearOnHide": false,
                           "validate": {
                              "required": true,
                              "customMessage": "Email is required to receive a copy of the results."
                           },
                           "validateWhenHidden": false,
                           "key": "email",
                           "type": "email",
                           "customClass": "reh-calc-email",
                           "input": true
                        },
                        {
                           "label": "Send Results!",
                           "showValidations": false,
                           "customClass": "reh-calc-submit",
                           "disableOnInvalid": true,
                           "tableView": false,
                           "key": "submit1",
                           "type": "button",
                           "saveOnEnter": false,
                           "input": true
                        }
                     ]
                  }
               ],
               "width": 6,
               "offset": 0,
               "push": 0,
               "pull": 0,
               "size": "md",
               "currentWidth": 6
            },
            {
               "components": [
                  {
                     "type": 'charts',            // Custom component type registered with Formio
                     "key": 'loanAnalysisChart',  // Unique key
                     "label": 'Loan Analysis Chart',
                     "chartType": 'pie',          // Specify the chart type
                     "stacked": true,
                     "donut": true,
                     "innerRadius": '40%',
                     "outerRadius": '70%',
                     "centerContent": '<div style="text-align: center;"><b>${{ utils.formatAsCurrency( data.monthlyPayment ) }}<br>Monthly Payment</b></div>',
                     "centerFontSize": '16px',
                     "centerFontColor": '#333333',
                     "centerFontFamily": 'Arial, sans-serif',
                     "centerFontWeight": 'normal',
                     "title": 'Charts',
                     "backgroundColor": '#FFFFFF',
                     "xAxisLabel": 'X Axis',
                     "yAxisLabel": 'Y Axis',
                     "events": [],
                     "dynamicUpdate": true,
                     "refreshOnChange": true,
                     "refreshOnFields": [
                        { field: 'monthlyPrincipalAndInterest' },
                        { field: 'monthlyTaxes' },
                        { field: 'monthlyHoa' },
                        { field: 'monthlyInsurance' },
                        { field: 'monthlyPayment' }
                     ],
                     jsonRawData: [
                        { "date": "202401", "principal": 1184.03, "interest": 4503.67, "balance": 513815.97 },
                        { "date": "202501", "principal": 6700.25, "interest": 24582.10, "balance": 507115.72 },
                        { "date": "202601", "principal": 7685.81, "interest": 26440.39, "balance": 499429.91 },
                        { "date": "202701", "principal": 8099.16, "interest": 26027.04, "balance": 491330.75 },
                        { "date": "202801", "principal": 8534.77, "interest": 25591.43, "balance": 482795.98 },
                        { "date": "202901", "principal": 8993.77, "interest": 25132.43, "balance": 473802.21 },
                        { "date": "203001", "principal": 9477.51, "interest": 24648.69, "balance": 464324.70 },
                        { "date": "203101", "principal": 9987.18, "interest": 24139.02, "balance": 454337.52 },
                        { "date": "203201", "principal": 10524.32, "interest": 23601.88, "balance": 443813.20 },
                        { "date": "203301", "principal": 11090.35, "interest": 23035.85, "balance": 432722.85 },
                        { "date": "203401", "principal": 11686.81, "interest": 22439.39, "balance": 421036.04 },
                        { "date": "203501", "principal": 12315.32, "interest": 21810.88, "balance": 408720.72 },
                        { "date": "203601", "principal": 12977.67, "interest": 21148.53, "balance": 395743.05 },
                        { "date": "203701", "principal": 13675.63, "interest": 20450.57, "balance": 382067.42 },
                        { "date": "203801", "principal": 14411.16, "interest": 19715.04, "balance": 367656.26 },
                        { "date": "203901", "principal": 15186.21, "interest": 18939.99, "balance": 352470.05 },
                        { "date": "204001", "principal": 16002.94, "interest": 18123.26, "balance": 336467.11 },
                        { "date": "204101", "principal": 16863.63, "interest": 17262.57, "balance": 319603.48 },
                        { "date": "204201", "principal": 17770.57, "interest": 16355.63, "balance": 301832.91 },
                        { "date": "204301", "principal": 18726.31, "interest": 15399.89, "balance": 283106.60 },
                        { "date": "204401", "principal": 19733.45, "interest": 14392.75, "balance": 263373.15 },
                        { "date": "204501", "principal": 20794.74, "interest": 13331.46, "balance": 242578.41 },
                        { "date": "204601", "principal": 21913.14, "interest": 12213.06, "balance": 220665.27 },
                        { "date": "204701", "principal": 23091.66, "interest": 11034.54, "balance": 197573.61 },
                        { "date": "204801", "principal": 24333.58, "interest": 9792.62, "balance": 173240.03 },
                        { "date": "204901", "principal": 25642.27, "interest": 8483.93, "balance": 147597.76 },
                        { "date": "205001", "principal": 27021.39, "interest": 7104.81, "balance": 120576.37 },
                        { "date": "205101", "principal": 28474.62, "interest": 5651.58, "balance": 92101.75 },
                        { "date": "205201", "principal": 30006.04, "interest": 4120.16, "balance": 62095.71 },
                        { "date": "205301", "principal": 31619.83, "interest": 2506.37, "balance": 30475.88 },
                        { "date": "205401", "principal": 30475.88, "interest": 805.79, "balance": 0.00 }
                     ],
                     xAxisKey: 'date',
                     datasets: [
                        {
                           label: "{{t('Principal and Interest')}}",
                           value: "{{ monthlyPrincipalAndInterest }}",
                           color: "#007bff",
                        },
                        {
                           label: "{{t('Taxes')}}",
                           value: "{{ monthlyTaxes }}",
                           color: '#28a745'
                        },
                        {
                           label: "{{t('HOA Dues')}}",
                           value: "{{ monthlyHoa }}",
                           color: "#ffc107"
                        },
                        {
                           label: `{{t("Homeowner's Insurance")}}`,
                           value: "{{ monthlyInsurance }}",
                           color: "#dc3545"
                        }
                        // {
                        //    label: 'Principal',
                        //    value: 'principal',
                        //    color: "#007bff",
                        // },
                        // {
                        //    label: 'Intereset',
                        //    value: 'interest',
                        //    color: "#28a745",
                        // },
                        // {
                        //    label: 'Balance',
                        //    value: 'balance',
                        //    color: "#ffc107",
                        // }
                     ],
                     "input": false,
                     "tableView": false,
                     "width": "100%",
                     "height": "400px",
                  },
                  {
                     "label": "Monthly Payment",
                     "tag": "div",
                     "attrs": [
                        {
                           "attr": "style",
                           "value": "width: 100%; max-width: 100%; text-align: center;"
                        }
                     ],
                     "content": "<h1>${{utils.formatAsCurrency(data.monthlyPayment)}}</h1>\n<h4>{{t('Monthly Payment')}}</h4>",
                     "refreshOnChange": true,
                     "key": "resultsMonthlyPayment",
                     "customConditional": "show = (!isNaN(data.monthlyPayment));",
                     "customClass": "reh-calc-results",
                     "type": "htmlelement",
                     "input": false,
                     "tableView": false
                  },
                  {
                     "label": "Payment Analysis",
                     "tag": "div",
                     "attrs": [
                        {
                           "attr": "style",
                           "value": "width: 100%; max-width: 100%; text-align: center;"
                        }
                     ],
                     "content": "<div class=\"reh-calc-hidden-if-{{ data.monthlyPayment === data.monthlyPrincipalAndInterest ? 'zero' : 'not-zero' }}\"><h3>{{t('Payment Analysis')}}</h3><table class=\"reh-calc-results reh-calc-payment-analysis\"><tbody><tr><td class=\"reh-calc-chart-color reh-calc-chart-color-1\"><span>&nbsp;</span></td><td>{{t('Principal and Interest')}}:</td><td class=\"reh-calc-results-amount\">${{ utils.formatAsCurrency( data.monthlyPrincipalAndInterest ) }}</td></tr><tr class=\"reh-calc-hidden-if-{{ ( data.monthlyTaxes + data.monthlyInsurance + data.monthlyHoa ) === 0 ? 'zero' : 'not-zero' }}\">   <td class=\"reh-calc-chart-color reh-calc-chart-color-3\">&nbsp;</span></td>   <td colspan=\"2\">{{t('Escrow')}}</td></tr><tr class=\"reh-calc-hidden-if-{{ data.monthlyTaxes === 0 ? 'zero' : 'not-zero' }}\"><td class=\"reh-calc-chart-color reh-calc-chart-color-3\"><span>&nbsp;</span></td><td class=\"reh-calc-indent\">{{t('Taxes')}}:</td><td class=\"reh-calc-results-amount\">${{ utils.formatAsCurrency( data.monthlyTaxes ) }}</td></tr><tr class=\"reh-calc-hidden-if-{{ data.monthlyInsurance === 0 ? 'zero' : 'not-zero' }}\"><td class=\"reh-calc-chart-color reh-calc-chart-color-4\"><span>&nbsp;</span></td><td class=\"reh-calc-indent\">{{t('Homeowner\\'s Insurance')}}:</td><td class=\"reh-calc-results-amount\">${{ utils.formatAsCurrency( data.monthlyInsurance ) }}</td></tr><tr class=\"reh-calc-hidden-if-{{ data.monthlyHoa === 0 ? 'zero' : 'not-zero' }}\"><td class=\"reh-calc-chart-color reh-calc-chart-color-5\"><span>&nbsp;</span></td><td class=\"reh-calc-indent\">{{t('HOA Dues')}}:</td><td class=\"reh-calc-results-amount\">${{ utils.formatAsCurrency( data.monthlyHoa ) }}</td></tr></tbody></table></div>",
                     "refreshOnChange": true,
                     "key": "resultsMonthlyPayment",
                     "customConditional": "show = (!isNaN(data.monthlyPayment));",
                     "customClass": "reh-calc-results",
                     "type": "htmlelement",
                     "input": false,
                     "tableView": false
                  }
               ],
               "width": 6,
               "offset": 0,
               "push": 0,
               "pull": 0,
               "size": "md",
               "currentWidth": 6
            }
         ],
         "customClass": "reh-calc-wrapper",
         "key": "wrapperColumns",
         "type": "columns",
         "input": false,
         "tableView": false
      },
      {
         "label": "Copyright",
         "tag": "div",
         "attrs": [
            {
               "attr": "style",
               "value": "width: 100%; max-width: 100%; text-align: center;"
            }
         ],
         "content": "<p><small><small><small>© 2024 <a href=\"https://rehub.com/\" target=\"_blank\">Rehub.com</a>.</small></small></small></p>",
         "refreshOnChange": false,
         "key": "copyright",
         "customClass": "reh-calc-copyright",
         "type": "htmlelement",
         "input": false,
         "tableView": false

      },
      {
         "title": "Intermediate Results",
         "customClass": "reh-calc-debug-only",
         "collapsible": true,
         "key": "intermediateResults",
         "type": "panel",
         "label": "Panel",
         "input": false,
         "tableView": false,
         "components": [
            {
               "label": "Original Loan Amount",
               "applyMaskOn": "change",
               "hideLabel": false,
               "mask": false,
               "tableView": false,
               "delimiter": true,
               "requireDecimal": false,
               "inputFormat": "plain",
               "truncateMultipleSpaces": false,
               "clearOnHide": false,
               "calculateValue": "value = data.propertyValue - data.downPayment;",
               "validateWhenHidden": false,
               "key": "originalLoanAmount",
               "type": "number",
               "decimalLimit": 0,
               "input": true
            },
            {
               "label": "Total Amount Financed",
               "applyMaskOn": "change",
               "hideLabel": false,
               "mask": false,
               "tableView": false,
               "delimiter": true,
               "requireDecimal": false,
               "inputFormat": "plain",
               "truncateMultipleSpaces": false,
               "clearOnHide": false,
               "calculateValue": "value = data.originalLoanAmount;",
               "validateWhenHidden": false,
               "key": "totalAmountFinanced",
               "type": "number",
               "decimalLimit": 0,
               "input": true
            },
            {
               "label": "Monthly Principal & Interest Raw",
               "applyMaskOn": "change",
               "hideLabel": false,
               "mask": false,
               "tableView": false,
               "delimiter": true,
               "requireDecimal": false,
               "inputFormat": "plain",
               "truncateMultipleSpaces": false,
               "clearOnHide": false,
               "calculateValue": "value = ( data.totalAmountFinanced * ( data.interestRate / 1200 ) / ( 1 - Math.pow( ( 1 + ( data.interestRate / 1200  ) ), ( -1 * data.durationYears * 12 ) ) ) );",
               "validateWhenHidden": false,
               "key": "monthlyPrincipalAndInterestRaw",
               "type": "number",
               "input": true
            },
            {
               "label": "Monthly Principal & Interest",
               "applyMaskOn": "change",
               "hideLabel": false,
               "mask": false,
               "tableView": false,
               "delimiter": true,
               "requireDecimal": false,
               "inputFormat": "plain",
               "truncateMultipleSpaces": false,
               "clearOnHide": false,
               "calculateValue": "value = Math.round( data.monthlyPrincipalAndInterestRaw * 100 ) / 100;",
               "validateWhenHidden": false,
               "key": "monthlyPrincipalAndInterest",
               "type": "number",
               "decimalLimit": 2,
               "input": true
            },
            {
               "label": "Monthly Taxes",
               "applyMaskOn": "change",
               "hideLabel": false,
               "mask": false,
               "tableView": false,
               "delimiter": true,
               "requireDecimal": false,
               "inputFormat": "plain",
               "truncateMultipleSpaces": false,
               "clearOnHide": false,
               "calculateValue": "value = isNaN( data.annualTaxes ) ? 0 : data.annualTaxes / 12;",
               "validateWhenHidden": false,
               "key": "monthlyTaxes",
               "type": "number",
               "decimalLimit": 2,
               "input": true
            },
            {
               "label": "Monthly Insurance",
               "applyMaskOn": "change",
               "hideLabel": false,
               "mask": false,
               "tableView": false,
               "delimiter": true,
               "requireDecimal": false,
               "inputFormat": "plain",
               "truncateMultipleSpaces": false,
               "clearOnHide": false,
               "calculateValue": "value = isNaN( data.annualInsurance ) ? 0 : data.annualInsurance / 12;",
               "validateWhenHidden": false,
               "key": "monthlyInsurance",
               "type": "number",
               "decimalLimit": 2,
               "input": true
            },
            {
               "label": "Monthly HOA",
               "applyMaskOn": "change",
               "hideLabel": false,
               "mask": false,
               "tableView": false,
               "delimiter": true,
               "requireDecimal": false,
               "inputFormat": "plain",
               "truncateMultipleSpaces": false,
               "clearOnHide": false,
               "calculateValue": "value = isNaN( data.annualHoa ) ? 0 : data.annualHoa / 12;",
               "validateWhenHidden": false,
               "key": "monthlyHoa",
               "type": "number",
               "decimalLimit": 2,
               "input": true
            },
            {
               "label": "Monthly Payment",
               "applyMaskOn": "change",
               "hideLabel": false,
               "mask": false,
               "tableView": false,
               "delimiter": true,
               "requireDecimal": false,
               "inputFormat": "plain",
               "truncateMultipleSpaces": false,
               "clearOnHide": false,
               "calculateValue": "value = data.monthlyPrincipalAndInterest + data.monthlyTaxes + data.monthlyInsurance + data.monthlyHoa;",
               "validateWhenHidden": false,
               "key": "monthlyPayment",
               "type": "number",
               "decimalLimit": 2,
               "input": true
            }
         ],
         "collapsed": false
      }
   ]
}

// // Render the form using Formio
// Formio.createForm(document.getElementById("formio"), formJson).then(form => {
//    form.on('change', (event) => {
//       console.log("Form Data Changed:", event.data);
//    });
// });

// Render the form builder
Formio.builder(document.getElementById("builder"), formJson, {
   sanitizeConfig: {
      addTags: ["svg", "path"],
      addAttr: ["d", "viewBox"]
   }
}).then(builder => {
   builder.on('change', (event) => {
      console.log("Form Data Changed:", event.data);
   });
});