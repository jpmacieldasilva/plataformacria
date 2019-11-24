   const app = new Vue({
       el: '#app',
       beforeMount() {
           //const req = fetch('https://jsonplaceholder.typicode.com/users');
           const req = fetch('http://dasilva.life/cria/wp-json/wp/v2/users');
           //const req = fetch('https://blog.plataformacria.com.br/wp-json/wp/v2/users', {mode: 'no-cors'});
           //const req = fetch('http://blog.plataformacria.com.br/wp-json/wp/v2/users');
           // const req = fetch('https://sheetsu.com/apis/v1.0su/f719d217746a');

           req.then(response => {
                   if (response.ok) {
                       return response.json();
                   }
                   throw new Error('Bad request: ' + response.status);
               })
               .then(users => {
                   this.users = users;
                   this.nextId = this.users.length + 1;
               });
       },
       data: {
           searchString: '',
           select: '',
           cidades: ["Male", "Female"],
           users: [{
               name: "Neo",
               link: 5,
               gender: "Male"
           }, ],
       },
       /* computed: {
            filteredList: function() {
                const searchString = this.searchString.toLowerCase();

                return this.users.filter(item => item.name.toLowerCase().includes(searchString));
            }
        },*/
       computed: {
           filteredList: function () {
               let filtered = this.users;
                if (this.searchString) {
                   filtered = this.users.filter(
                       u => u.name.toLowerCase().indexOf(this.searchString) > -1 ||
                            u.description.toLowerCase().indexOf(this.searchString) > -1

                   );
               }
               if (this.select) {
                   filtered = filtered.filter(
                       u => u.slug.toLowerCase() === this.select.toLowerCase()
                   );
               }
               return filtered;
           }
       }
   });