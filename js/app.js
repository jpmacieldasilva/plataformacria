   const app = new Vue({
       el: '#app',
       beforeMount() {
           /* const req = fetch('https://api.myjson.com/bins/1b1faq'); */
           const req = fetch('https://plataformacria-3c64c.firebaseio.com/users.json');
           req.then(response => {
                   if (response.ok) {
                       return response.json();
                   }
                   throw new Error('Bad request: ' + response.status);
               })
               .then(users => {
                   this.nextId = this.users.length + 1;
                   users = Object.keys(users).map(key => users[key]);
                   this.users = users;
               });
       },
       data: {
           searchString: '',
           select: '',
           select2: '',
           areas: ["Artes Cênicas", "Música", "Artes Visuais", "Artes Plásticas", "Animação", "Literatura e Mercado Editorial", "Audiovisual", "Games / Software", "Moda", "Arquitetura", "Design", "Gastronomia", "Cultura Popular", "Artesanato", "Mídias Digitais", "Eventos", "Turismo Cultural"],
           cidades: ["Águas Claras", "Arniqueiras", "Brasília", "Brazlândia", "Ceilândia", "Candangolândia", "Cruzeiro", "Fercal", "Gama", "Guará", "Itapoã", "Jardim Botânico", "Lago Norte", "Lago Sul", "Núcleo Bandeirante", "Paranoá", "Park Way", "Planaltina", "Recanto das Emas", "Riacho Fundo", "Riacho Fundo II", "Samambaia", "Santa Maria", "São Sebastião", "SCIA/Estrutural", "SIA", "Sobradinho", "Sobradinho II", "Sudoeste/Octogonal", "Taguatinga", "Varjão", "Vicente Pires"],
           users: [{
               name: "Neo",
               city: "Brazlândia",
               job: "Designer",
               image: "https://images.pexels.com/photos/2755165/pexels-photo-2755165.jpeg"
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
                       u => u.name.toLowerCase().indexOf(this.searchString.toLowerCase()) > -1 ||
                       u.job.toLowerCase().indexOf(this.searchString) > -1 ||
                       u.description.toLowerCase().indexOf(this.searchString) > -1
                   );
               }
               if (this.select) {
                   filtered = filtered.filter(
                       u => u.city.toLowerCase() === this.select.toLowerCase()
                   );
               }
               if (this.select2) {
                   filtered = filtered.filter(
                       u => u.job.toLowerCase() === this.select2.toLowerCase()
                   );
               }
               return filtered;
           }
       }
   });