// Create (or recreate) ID counters for our various entities
db.counters.insert(
   {
      _id: "cemetery",
      seq: 0,
   }
)

db.counters.insert(
   {                                                                            
      _id: "geopoint",
      seq: 0,                                                                   
   }
)

db.counters.insert(
   {                                                                            
      _id: "marker",
      seq: 0,                                                                   
   }
)

db.counters.insert(
   {                                                                            
      _id: "person",
      seq: 0,                                                                   
   }
)

db.counters.insert(
   {                                                                            
      _id: "reading",
      seq: 0,                                                                   
   }
)
