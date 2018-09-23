fire = () =>{
        
        
                        let sql = "SELECT * FROM `security_table`";
                        console.log(sql);
                        fetch('http://biharilegends.com/biharilegends.com/market_go/run_query.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                query: sql,
                            }) 
                            }).then((response) => response.json())
                                .then((responseJson) => {
                                    console.log(responseJson);
                                    alert("changed password successfully"); 
                                   
                
                                }).catch((error) => {
                                    alert("updated slow network");
                                    console.log(error);
                                    
                
                                });

    }