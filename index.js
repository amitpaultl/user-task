const express = require('express');
const cors = require('cors');
const prot = process.env.PROT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://usertask:1MejwWhHyCaGIeTG@cluster0.acij04d.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// db connent

const dbConnent = async () => {
    try {
        await client.connect();
        console.log('data bas');
    } catch (error) {
        console.log(error);
    }
}
dbConnent();

const task = client.db('userTask').collection('task');
const comment = client.db('userTask').collection('comment');

//  add task
app.post("/userTask", async (req, res) => {
    try {
        const result = await task.insertOne(req.body);
        if (result.insertedId) {
            res.send({
              success: true,
              message: `Successfully created the ${req.body.title}`,
            });
        }else {
            res.send({
              success: false,
              error: "Couldn't create the product",
            });
        }
    } catch (error) {
        res.send({
          success: false,
          error: error.message,
        });
    }
})

//  add comment
app.post("/comment", async (req, res) => {
    try {
        const result = await comment.insertOne(req.body);
        if (result.insertedId) {
            res.send({
              success: true,
              message: `Successfully created the ${req.body.title}`,
            });
        }else {
            res.send({
              success: false,
              error: "Couldn't create the product",
            });
        }
    } catch (error) {
        res.send({
          success: false,
          error: error.message,
        });
    }
})

//  get comment
app.get("/comment", async(req,res)=>{
    try {
        const query = {};
        const cursor = comment.find(query)
        const products = await cursor.toArray();
        res.send({
            success: true,
            data: products,
            message: "Successfully got the data",
        });
        
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
})

//  get task
app.get("/getTask", async(req,res)=>{
    try {
        const query = {};
        const cursor = task.find(query)
        const products = await cursor.toArray();
        res.send({
            success: true,
            data: products,
            message: "Successfully got the data",
        });
        
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
})

// get task is
app.get(`/getTask/:id`,async(req,res)=>{
    try {
        const id = req.params.id;
        const services = await task.findOne({_id:ObjectId(id)});
        res.send({
            success: true,
            data: services,
            message: "Successfully got the data",
        });
        
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
        });
    }
})

// update data
app.put(`/updateTask/:id`,async (req,res)=>{
    try {
        const id = req.params.id;
        const status = req.body;
        // const update : {$set : status};
        const filter = {_id : ObjectId(id)}
        const updateId = {
            $set: {
                publish: true
            }
        }
        const result = await task.updateOne(filter, updateId )
        res.send({
            success : true,
            data: result
        })
        
    } catch (error) {
        res.send({
            success: false,
            error: error.message

        })
    }
})

// // update data
// app.put(`/updateTaskOld/:id`,async (req,res)=>{
//     try {
//         const id = req.params.id;
//         const status = req.body;
//         // const update : {$set : status};
//         const filter = {_id : ObjectId(id)}
//         const updateId = {
//             $set: {
//                 publish: true
//             }
//         }
//         const result = await task.insertOne(status);

//         res.send({
//             success : true,
//             data: result
//         })
        
//     } catch (error) {
//         res.send({
//             success: false,
//             error: error.message

//         })
//     }
// })

// update data
app.put(`/updateTaskNot/:id`,async (req,res)=>{
    try {
        const id = req.params.id;
        const status = req.body;
        // const update : {$set : status};
        const filter = {_id : ObjectId(id)}
        const updateId = {
            $set: {
                publish: false
            }
        }
        const result = await task.updateOne(filter, updateId )
        res.send({
            success : true,
            data: result
        })
        
    } catch (error) {
        res.send({
            success: false,
            error: error.message

        })
    }
})

// delete data 
app.delete('/deleteTask/:id', async(req,res)=>{
    
    try {
        const id = req.params.id;
        const query = {_id: ObjectId(id)}
        
        const result = await task.deleteOne(query);
       
        if(result.deletedCount){
            res.send({
                success : true,
                message: `Successfully delete `
            })
            
        }
        
    } catch (error) {
        res.send({
            success: false,
            error: error.message,
          });

    }

})

// 

app.get('/', (req, res) => {
    res.send('user task  server running')
})

app.listen(prot, () => {
    console.log('user task selling log');
})