import { Formio } from 'formiojs'
import i18next from 'i18next';
import Charts from './charts/Charts.js';
import ColorPickerComponent from './colorpicker/ColorPicker.js';

// Initialize i18next with desired languages and configurations
i18next.init({
   lng: 'en',
   fallbackLng: 'en',
   resources: {
      en: {
         translation: {
            'Principal and Interest': 'Principal and Interest',
            'Monthly Payment': 'Monthly Payment',
         },
      },
      es: {
         translation: {
            'Principal and Interest': 'Principal e Interés',
            'Monthly Payment': 'Pago Mensual',
         },
      },
   },
});

// Attach the initialized i18next instance to Formio
Formio.i18next = i18next;

Formio.Components.addComponent('colorpicker', ColorPickerComponent);

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
                     datasets: [
                        {
                           label: "{{t('Principal and Interest')}}",
                           value: "{{ data.monthlyPrincipalAndInterest }}",
                           color: "#007bff",
                        },
                        {
                           label: "{{t('Taxes')}}",
                           value: "{{ data.monthlyTaxes }}",
                           color: '#28a745'
                        },
                        {
                           label: "{{t('HOA Dues')}}",
                           value: "{{ data.monthlyHoa }}",
                           color: "#ffc107"
                        },
                        {
                           label: `{{t("Homeowner's Insurance")}}`,
                           value: "{{ data.monthlyInsurance }}",
                           color: "#dc3545"
                        }
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

// Render the form using Formio
Formio.createForm(document.getElementById("formio"), formJson).then(form => {
   form.on('change', (event) => {
      console.log("Form Data Changed:", event.data);
   });
});