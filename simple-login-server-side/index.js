require( 'dotenv' ).config();
const express = require( 'express' );
const app = express();
const port = process.env.PORT || 5001;
const cors = require( 'cors' );
const { MongoClient } = require( 'mongodb' );
const ObjectId = require( 'mongodb' ).ObjectId;

//middleware for Cross Origin Resource Sharing and JSON parsing
app.use( cors() );
app.use( express.json() );

const uri = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASS }@spraxa-practice.ovkze.mongodb.net/simple-login?retryWrites=true&w=majority`;

const client = new MongoClient( uri, { useNewUrlParser: true, useUnifiedTopology: true } );

const run = async () => {
    try {
        await client.connect();
        console.log( 'database connected' );

        //Create the database
        const database = client.db( "simple-login" );

        //Create the collections
        const usersCollection = database.collection( "users" );

        //GET Users API (Send all users information to the client)
        app.get( '/getAllUsers', async ( req, res ) => {
            const cursor = await usersCollection.find( {} );
            const users = await cursor.toArray();
            res.send( users );
            //res.send( { users: users, success: true } );
        } );

        // GET Single Users API
        app.get( '/users/:id', async ( req, res ) => {
            const id = req.params.id;
            const filter = { _id: ObjectId( id ) };
            const cursor = await usersCollection.findOne( filter );
            res.send( cursor );
        } );

        //POST API (Add a User)
        app.post( '/users', async ( req, res ) => {
            const user = req.body;
            const result = await usersCollection.insertOne( user );
            res.json( result );
        } );

        //UPDATE API (Update a User)
        app.put( '/users/:id', async ( req, res ) => {
            const userId = req.params.id;
            const updatedUser = req.body;
            const filter = { _id: ObjectId( userId ) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updatedUser.name,
                    username: updatedUser.username,
                    phone: updatedUser.phone,
                    email: updatedUser.email
                },
            };
            const result = await usersCollection.updateOne( filter, updateDoc, options );
            res.json( result );
        } );

        //DELETE API (Delete a User)
        app.delete( '/users/:id', async ( req, res ) => {
            const id = req.params.id;
            const filter = { _id: ObjectId( id ) };
            const result = await usersCollection.deleteOne( filter );
            res.json( result );
        } );
    }
    finally {
        // await client.close();
    }
}

run().catch( console.dir );

app.get( '/', ( req, res ) => {
    res.send( 'Hello Spraxa Family!' )
} )

app.listen( port, () => {
    console.log( `Spraxa Simple Login app listening at http://localhost:${ port }` )
} );