var db = [
    {name: 'james Butters',email:'james@gmail.com',age:15},
    {name: 'mark Butters',email:'mark@gmail.com',age:55},
    {name: 'lara Butters',email:'lara@gmail.com',age:88},
];

(function Avatars(db) {
    this.init= function() {
        this.generateList();
        this.enterUser();
    }
    this.generateList= function (){
        var parent = document.querySelector('#parent_avatars');
        var template='';

        for (var i=0;i<db.length; i++) {
            template += '<div class="col-sm-4">';
            template += '   <div class="card">';
            template += '       <div class="card-delete" data-card="'+i+'">x</div>';
            template += '       <div class="card-block">';
            template += '           <h3 class="card-title">'+ db[i].name +'</h3>';
            template += '           <p class="card-text"><strong>Email:</strong>'+db[i].email+'</p>';
            template += '           <p class="card-text"><strong>Age:</strong>'+db[i].age+'</p>';
            template += '       </div>';
            template += '   </div>';
            template += '</div>';
        }

        parent.innerHTML='';
        parent.insertAdjacentHTML("afterbegin",template);
        deleteCard();
    };

    this.enterUser = function(){

        function grabUser()
        {
            var name= document.querySelector("#user_name").value;
            var email= document.querySelector("#user_email").value;
            var age= document.querySelector("#user_age").value; 

            var elements= [name, email,age];

            if (validateUser(elements))
            {
                document.querySelector("#myForm").reset();
                db.push({name:name, email:email, age: age});
                generateList();
                
            }   
            else {
               document.querySelector("#error").style.display= 'block';
               setTimeout(function(){
                document.querySelector("#error").style.display= 'none';
               },2000)
            }

        }

        document.querySelector('#myForm').addEventListener("submit",function(e) {
            e.preventDefault();
            grabUser();
        });
    };

    this.validateUser = function(inputs){
        {
            for(var i=0; i< inputs.length; i++ )
            if(inputs[i]==""){
                return false;
            }
            return true;
        }
    }

    this.deleteCard= function(){
        var buttons= document.querySelectorAll('.card-delete');
        
        function deleteThis(element){
            var obj= element.getAttribute('data-card');
            db.splice(obj,1);
            generateList();
        }


        for(var i=0; i<buttons.length; i++)
       { 
           buttons[i].addEventListener('click',function(e){
            deleteThis(this)
        })
        }
    };

    this.init();
})(db);