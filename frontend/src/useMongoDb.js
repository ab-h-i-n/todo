const useMongoDb = () => {


    const getUser = () => {

        return new Promise((resolve, reject) => {

            const userId = localStorage.getItem("user_id");

            console.log(JSON.stringify({ _id: userId }));

            fetch('http://localhost:3001/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: userId })
            })
            .then((responce) => {
                
                if(responce.ok){

                    return responce.json();

                }else{

                    throw Error('Error fetching user');

                }

            }).then((result)=>{

                resolve(result);

            }).catch((error)=>{

                reject(error);

            })

        });

    }


    return {
        getUser
    }


}

export default useMongoDb
