// console.log('chunk_file');


 // grabbed the input field
 const droparea = document.querySelector('.file');
   console.log(droparea)

   droparea.addEventListener('dragover', (e) => {
     e.preventDefault();
   });

   droparea.addEventListener('drop', (e) => {
     e.preventDefault();

     const file = e.dataTransfer.files[0];
     let type= file.type
     console.log(type);

     if (type === 'text/csv') {
         return upload(file);
     } else {
         droparea.setAttribute('class', 'droparea inalid');
         droparea.innerHTML = 'Invalid file format..!';
         return false;
     }

     const upload = (file) => {
         droparea.setAttribute('class', 'droparea valid');
         droparea.innerHTML = 'Added' + file.name;
     }
   });
