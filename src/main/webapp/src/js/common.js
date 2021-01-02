  
  export function colorRating(rating){

    switch(rating){
      case 'Myth':
        // return '#000'
        return '#3b0000'
      case 'Legendary':
        return '#FFD500'
      case 'Unique':
        return '#9C27B0'
      case 'Rare':
        return '#3F51B5'
      case 'Uncommon':
        return '#4CAF50'
      case 'Common':
        return '#9E9E9E'
    }

  };