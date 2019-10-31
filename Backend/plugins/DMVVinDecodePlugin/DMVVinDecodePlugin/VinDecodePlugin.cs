using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ServiceModel;
using Microsoft.Xrm.Sdk;
using System.Globalization;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Xml;

namespace DMVVinDecodePlugin
{
    public class VinDecodePlugin : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            // obtain the tracing service
            ITracingService tracingService =
                (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            // obtain the context in which the plugin is currently running
            IPluginExecutionContext context =
                (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            if (context.InputParameters.Contains("Target") && context.InputParameters["Target"] is Entity)
            {
                // obtain the entity from the input parameters
                Entity vehicle = (Entity)context.InputParameters["Target"];

                // get organization service reference for making web service calls
                IOrganizationServiceFactory serviceFactory =
                    (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

                // start business logic
                try
                {
                    // create initial variables
                    string vin = vehicle.Attributes["dmv_vehicleidentificationnumber"].ToString();
                    string webApi = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/";
                    string apiParams = "?format=xml";

                    string responseString;
                    try {
                        using (HttpClient client = new HttpClient())
                        {
                            // set the timeout and headers
                            client.Timeout = TimeSpan.FromMilliseconds(15000);
                            client.DefaultRequestHeaders.ConnectionClose = true;

                            HttpResponseMessage response = client.GetAsync(webApi + vin + apiParams).Result;
                            response.EnsureSuccessStatusCode();

                            responseString = response.Content.ReadAsStringAsync().Result;
                        }
                    }
                    catch (AggregateException aex)
                    {
                        tracingService.Trace("Inner Exceptions:");

                        foreach (Exception ex in aex.InnerExceptions)
                        {
                            tracingService.Trace("  Exception: {0}", ex.ToString());
                        }


                        throw new InvalidPluginExecutionException(string.Format(CultureInfo.InvariantCulture,
                            "An exception occurred while attempting to issue the request.", aex));
                    }

                    if (responseString != "" && responseString != null)
                    {
                        // create xml document and get the response string
                        XmlDocument xmlContent = new XmlDocument();
                        xmlContent.LoadXml(responseString);

                        // get the attributes we want
                        string make = xmlContent.GetElementsByTagName("Make")[0].InnerText.Trim();
                        string model = xmlContent.GetElementsByTagName("Model")[0].InnerText.Trim();
                        string year = xmlContent.GetElementsByTagName("ModelYear")[0].InnerText.Trim();
                        string fuel = xmlContent.GetElementsByTagName("FuelTypePrimary")[0].InnerText.Trim();
                        string body = xmlContent.GetElementsByTagName("BodyClass")[0].InnerText.Trim();
                        string type = xmlContent.GetElementsByTagName("VehicleType")[0].InnerText.Trim();
                        string length = xmlContent.GetElementsByTagName("TrailerLength")[0].InnerText.Trim();

                        // add all fields to vehicle
                        if (make != "" && make != null)
                        {
                            vehicle.Attributes["dmv_vehiclemake"] = make;
                        }
                        if (model != "" && model != null)
                        {
                            vehicle.Attributes["dmv_modelorseries"] = model;
                        }
                        if (year != "" && year != null)
                        {
                            vehicle.Attributes["dmv_yearmodel"] = int.Parse(year);
                        }
                        if (body != "" && body != null)
                        {
                            vehicle.Attributes["dmv_bodytypemodel"] = body;

                            if (body.ToLower().Contains("truck"))
                            {
                                vehicle.Attributes["dmv_typeofvehicle"] = new OptionSetValue(174070001);
                            }
                        }
                        if (fuel != "" && fuel != null)
                        {
                            switch (fuel.ToLower())
                            {
                                case "gasoline":
                                    vehicle.Attributes["dmv_fueltype"] = new OptionSetValue(174070000);
                                    break;
                                case "diesel":
                                    vehicle.Attributes["dmv_fueltype"] = new OptionSetValue(174070001);
                                    break;
                                case "liquefied petroleum gas (propane or lpg)":
                                    vehicle.Attributes["dmv_fueltype"] = new OptionSetValue(174070002);
                                    break;
                                case "compressed natural gas (cng)":
                                    vehicle.Attributes["dmv_fueltype"] = new OptionSetValue(174070003);
                                    break;
                                case "ethanol (e85)":
                                case "neat ethanol (e100)":
                                    vehicle.Attributes["dmv_fueltype"] = new OptionSetValue(174070004);
                                    break;
                                case "bio-diesel":
                                    vehicle.Attributes["dmv_fueltype"] = new OptionSetValue(174070005);
                                    break;
                                default:
                                    break;
                            }
                        }
                        if (type != "" && type != null)
                        {
                            switch (type.ToLower())
                            {
                                case "bus":
                                    vehicle.Attributes["dmv_typeofvehicle"] = new OptionSetValue(174070001);
                                    break;
                                case "motorcycle":
                                    vehicle.Attributes["dmv_typeofvehicle"] = new OptionSetValue(174070002);
                                    break;
                                case "off road vehicle":
                                    vehicle.Attributes["dmv_typeofvehicle"] = new OptionSetValue(174070003);
                                    break;
                                case "trailer":
                                    vehicle.Attributes["dmv_typeofvehicle"] = new OptionSetValue(174070004);
                                    break;
                                default:
                                    vehicle.Attributes["dmv_typeofvehicle"] = new OptionSetValue(174070000);
                                    break;
                            }
                        }

                        if (length != "" && length != null)
                        {
                            vehicle.Attributes["dmv_lengthtrailer"] = float.Parse(length);
                        }

                        service.Update(vehicle);
                    }

                }
                catch (FaultException<OrganizationServiceFault> ex)
                {
                    throw new InvalidPluginExecutionException("An error occurred in VinDecodePlugin.", ex);
                }
                catch (Exception ex)
                {
                    tracingService.Trace("VinDecodePlugin: {0}", ex.ToString());
                    throw;
                }
            }
        }
    }
}
