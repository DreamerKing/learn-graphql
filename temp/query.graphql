query allLifts {
  allLifts(status: OPEN ) {
    id
    name
    status
  } 
}

query liftCount {
  liftCount
}

query allTrials2 {
  allTrails(status: CLOSED) {
    name
    id
    status
  }
}

mutation setTrailStatus {
  setTrailStatus(id: "blue-bird", status: CLOSED) {
    id
    name
    status
  } 
}

query trialCount {
  trailCount(status: OPEN)
}

query allLiftsAndTrailsCount {
  lcount: liftCount
  trailCount
  trails: allTrails {
    name
    _id: id
    status
  }
}

query jazzCatStatus {
  Lift(id: "jazz-cat") {
    capacity
    status
    trailAccess {
      name
      difficulty
    }
  }
}

query liftToAccessTrail {
  Trail(id: "dance-fight") {
    groomed
    status
    accessedByLifts {
      name
      status
      capacity
    }
  }
}

mutation setStatus2($id: ID!, $status: TrailStatus!) {
  setTrailStatus(id: $id, status: $status) {
    name
    status
  }
}

fragment liftInfo on Lift {
   name
    status
    capacity
    night
    elevationGain
}

fragment nameDiffculty on Trail {
   name
  # difficulty
}

query f {
  lift: Lift(id: "jazz-cat") {
    ...liftInfo
  	trailAccess {
     ...nameDiffculty
    }
  }
  trail: Trail(id: "river-run") {
   ...nameDiffculty
    accessedByLifts {
     ...liftInfo
    }
  }
}

fragment trailInfo on Trail {
  name
  difficulty
  accessedByLifts {
    ...liftInfo
  }
}

query f2 {
  lift: Lift(id: "jazz-cat") {
    ...liftInfo
  	trailAccess {
     ...trailInfo
    }
  }
  trail: Trail(id: "river-run") {
   ...trailInfo
    groomed
    trees
    night
  }
}

fragment trailStatus on Trail {
  name
  status
}

fragment trailDetails on Trail {
  name
  groomed
  trees
  night
}

query detail {
  allTrails {
    ...trailStatus
    ...trailDetails
  }
}

subscription liftStatusChange {
  liftStatusChange {
    name
    capacity
    status
  }
}




query self {
  __type(name: "Lift") {
    name
    fields {
      name
      description
      type {
        name
        kind
      }
    }
  }
}

# 自检
query roots {
  __schema {
    queryType {
      ...typeFields
    }
    mutationType {
      ...typeFields
    }
    subscriptionType {
      ...typeFields
    }
  }
}

fragment typeFields on __Type {
  name
  fields {
    name
  }
}