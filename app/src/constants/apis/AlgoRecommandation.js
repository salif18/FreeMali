
const users = [
    {
      id:1,
      interests:['commedie','sports','film'],
    },
    {
      id:2,
      interests:['commedie']
    },
    {
      id:3,
      interests:['cuisine','sports','film'],
    },
    {
      id:4,
      interests:['commedie','sports','film','magazine'],
    }
  ]
  
  
  const donnees = [
    {id:34, title:'wwwE', category:['sports']},
    {id:35,title:'foot',category:['sports']},
    {id:36,title:'bergeur',category:['magazine','cuisine']},
    {id:37,title:'rire',category:['commedie','film']}
  ]
  
  
  //algorythme
  const recommandation = (userId) => {
    const user = users.find((user) => user.id === userId );
    if(!user){
      return []
    }
    return donnees.filter((data) => (
      data.category.some((d) => user.interests.includes(d))
    ))
  }
  
  console.log(recommandation(6))