import { myAxios } from "./helper";

export const getDrivers=async ()=>{
    const response = await myAxios.get('api/driver/');
    return response;
}
export const getDriver = async (id) => {
    const response = await myAxios.get(`api/driver/${id}`);
    return response;
};

export const updateOrderStatus=async (Data)=> {
    var pickup="";
    var dropoff="";
    
     if(Data.pickuplatitude!==undefined){
        pickup=Data.pickuplatitude+","+Data.pickuplongitude;
        dropoff=Data.dropOffLatitude+","+Data.dropOffLongitude;
 
    }
    else{
     pickup=Data.pickUp;
     dropoff=Data.dropOff;
    }
     Data.size=parseInt(Data.size);
     Data.weight=parseInt(Data.weight);
     let data={
         "orderId": Data.orderId,
         "orderName": Data.orderName,
         "noOfLabors": Data.noOfLabors,
         "totalWeight": Data.weight,
         "totalSize": Data.size,
         "paymentStatus": Data.paymentStatus,
         "fragility": false,
         "status": {
             "statusId": "4",
             "status": "delivered"
         },
         "price": Data.price,
         "client": {
             "id": Data.client.id,
             "userName": "cent1",
             "password": "mypassword",
             "phoneNumber": "1234567890",
             "cnic": 1234567890123,
             "companyName": "company"
         },
         "driver": {
             "id": Data.driver.id,
             "userName": "funny_driver",
             "password": "2323",
             "phoneNumber": "24433232332",
             "cnic": 434343434434,
             "licenseNumber": "232332",
             "yearsOfExperience": 32,
             "salary": 23232,
             "foodCost": 2323,
             "status": {
                 "statusId": 1,
                 "status": "busy"
             },
             "vehicle": {
                 "vehicleId": 6,
                 "name": "formevehicle",
                 "maxWeightCarry": 3434,
                 "mileage": 3434.0,
                 "plateNo": "V234",
                 "cost": {
                     "maintenanceCost": 645.0,
                     "fuelCost": 434.0
                 },
                 "vtype": {
                     "typeId": 3,
                     "typeName": "container"
                 },
                 "status": {
                     "statusId": 4,
                     "status": "assigned"
                 }
             }
         },
         "payment": {
             "paymentId": Data.paymentId,
             "paymentMode": Data.paymentMode
         },
         "pickUp": pickup,
         "dropOff": dropoff,
         "estimatedArrivalOfGoods": null,
         "schedule": Data.schedule||null
     }
 
     const response=myAxios.put(`api/orders/${Data.orderId}`,data);
     return response;
 }

export const getOrders=async ()=>{
    const response = await myAxios.get('api/orders/');
    return response;
}
export const getClient=async (id)=>{
    const response = await myAxios.get(`api/orders/${id}`);
    return response;
}
export const getOrderById=async (id)=>{
    const response = await myAxios.get(`api/orders/${id}`);
    return response;
}

export const login=async (userDetail)=>{
    const userDetailsString = JSON.stringify(userDetail);
    const userDetails = JSON.parse(userDetailsString);
    // const data={
    //     "userName": "d",
    //     "password":"kjjjkjk",
    // };
    const data={
        "userName": userDetails.username,
        "password":userDetails.password,
    };
    const response = await myAxios.post('api/driver/login',data);
    return response;
}

export const addReview=async (data)=>{
    const date=new Date()
    const Data={
        "rating": data.rating,
        "comment": data.comment,
        "reviewDate": date,
        "order": {
            "orderId": data.orderId,
            "orderName": null,
            "noOfLabors": 0,
            "totalWeight": 12.0,
            "totalSize": 1.0,
            "fragility": false,
            "price": 15.0,
            "status": {
                "statusId": 3,
                "status": "pending"
            },
            "client": {
                "id": data.client.id,
                "userName": "SyedMubarak",
                "password": "Syed!123",
                "phoneNumber": "03043737019",
                "cnic": 4510287726477,
                "companyName": "Jil"
            },
            "driver": {
                "id": data.driver.id,
                "userName": "driver_1",
                "password": "driver1pass",
                "phoneNumber": "034393443443",
                "cnic": 441098565045,
                "licenseNumber": "441098565645-455",
                "yearsOfExperience": 6,
                "salary": 6000,
                "foodCost": 500,
                "status": {
                    "statusId": 1,
                    "status": "busy"
                },
                "vehicle": {
                    "vehicleId": 2,
                    "name": "giant container",
                    "maxWeightCarry": 454,
                    "minWeightCarry": null,
                    "maxSizeCarry": null,
                    "mileage": 56.0,
                    "plateNo": "API-108",
                    "cost": {
                        "maintenanceCost": 3434.6,
                        "fuelCost": 534.0
                    },
                    "vtype": {
                        "typeId": 2,
                        "typeName": "bulk",
                        "cost": null
                    },
                    "status": {
                        "statusId": 4,
                        "status": "assigned"
                    }
                }
            },
            "payment": {
                "paymentId": data.payment.paymentId,
                "paymentMode": data.payment.paymentMode
            },
            "orderLocation": {
                "pickUp": "0",
                "dropOff": "0"
            },
            "orderSchedule": {
                "schedule": "2023-05-15T07:30:33.502+00:00"
            },
            "estimatedArrivalOfGoods": data.estimatedArrivalOfGoods,
            "image": null,
            "imageName": null,
            "imageType": null
        },
        "client": {
            "id": global.id,
            "userName": "SyedMubarak",
            "password": "Syed!123",
            "phoneNumber": "03043737019",
            "cnic": 4510287726477,
            "companyName": "Jil"
        },
        "driver": {
            "id": data.driver.id,
            "userName": "driver_1",
            "password": "driver1pass",
            "phoneNumber": "034393443443",
            "cnic": 441098565045,
            "licenseNumber": "441098565645-455",
            "yearsOfExperience": 6,
            "salary": 6000,
            "foodCost": 500,
        }};
    const response=myAxios.post(`api/review/order/${data.orderId}/driver-review`,Data);
    
    return response
}



export const confirmDelivery=async (id)=>{
    const response = await myAxios.put(`api/orders/${id}`,{
        "status": {
                 "statusId": 4,
                 "status": "delivered"
             },
         
        "price": 300.0,
        "orderId": 1,
        "driver":  {
            "id": 6,
            "userName": "recent driver",
            "password": "213123",
            "phoneNumber": "234343343432",
            "cnic": 34343,
            "licenseNumber": "3432432",
            "yearsOfExperience": 342334324,
            "salary": 5345,
            "foodCost": 34344,
            "vehicle": {
                "vehicleId": 5,
                "name": "small container",
                "maxWeightCarry": 454,
                "mileage": 56.0,
                "plateNo": "API-122",
                "cost": {
                    "maintenanceCost": 3434.6,
                    "fuelCost": 534.0
                },
                "vtype": {
                    "typeId": 2,
                    "typeName": "bulk"
                },
                "status": {
                    "statusId": 2,
                    "status": "unassigned"
                }
            },
            "status": {
                "statusId": 3,
                "status": "available"
            }
        }
         }    
    );
    return response;
}


export const getVehicle=async (id)=>{
    const response=await myAxios.get(`api/vehicle/${id}`);
    return response;
}
export const updateVehicle=async (data)=>{
    
    Data={
        "maintenanceCost": data.maintenanceCost,
        "fuelCost": data.fuelCost,
        "status": {
                "statusId": data.status.statusId,
                "status": data.status.status
            },
        }
    console.log("Vehicle Data"+JSON.stringify(global.vid));
    const response=await myAxios.put(`api/vehicle/${global.vid}`,Data);
    console.log()
    return response;
}


export const updateDriver=async (driver)=>{
    data={
            "id": driver.id,
            "userName": driver.userName,
            "password": driver.password,
            "phoneNumber": driver.phoneNumber,
            "cnic": parseInt(driver.cnic),
            "licenseNumber": driver.licenseNumber,
            "yearsOfExperience": parseInt(driver.yearsOfExperience),
            "salary": parseInt(driver.salary),
            "foodCost": driver.foodCost,
            "vehicle": {
                "vehicleId": global.vid,
                "name": "giant container",
                "maxWeightCarry": 454,
                "minWeightCarry": null,
                "maxSizeCarry": null,
                "mileage": 56.0,
                "plateNo": "API-108",
                "cost": {
                    "maintenanceCost": 3434.6,
                    "fuelCost": 534.0
                },
                "vtype": {
                    "typeId": 2,
                    "typeName": "bulk",
                    "cost": null
                },
                "status": {
                    "statusId": 4,
                    "status": "assigned"
                }
            },
            "status": {
                "statusId": driver.status.statusId,
                "status": driver.status.status
         
            },
            "location": driver.location
        }
    const response=myAxios.put(`api/driver/${driver.id}`,data);
    return response;
}

