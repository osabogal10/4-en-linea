import { Mongo } from 'meteor/mongo';
import {Meteor} from "meteor/meteor"

export const Partidas = new Mongo.Collection('partidas');

if(Meteor.isServer)
{
	Meteor.publish("partidas", ()=>{
	return Partidas.find({});
	});	
}

Meteor.methods(
{
	"partidas.start":function(name){

		const par = Partidas.findOne({
		    J1:Meteor.user().username,
		    J2:name
		  });

		  if(!par)
		  {
		    Partidas.insert({
		      J1:Meteor.user().username,
		      J2:name,
		      actual:true
		    })
		    alert("Partida insertada")
		  }

		  const jugadores = [2];
		  jugadores[0]= Meteor.user().username
		  jugadores[1]= name;

		  return jugadores;
	},
	"partidas.consultar":function(name){
		const x = Partidas.findOne({
		    J1:name
		  });

		const y = Partidas.findOne({
		    J2:name
		  });

		if(x||y)
		{
			return true;
		}
		else
		{
			return false;
		}

	},
	"partidas.darJugadores":function(name){
		const partidaDev = [2];

		const x = Partidas.findOne({
		    J1:name
		  });

		const y = Partidas.findOne({
		    J2:name
		  });

		if(x)
		{
			partidaDev [0] =x.J1;
			partidaDev [1] =x.J2;
		}
		else if(y)
		{
			partidaDev [0] =y.J1;
			partidaDev [1] =y.J2;
		}

		return partidaDev;
	}
	
});
