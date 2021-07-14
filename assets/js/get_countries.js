/*
 * Esse script gera os cards introdutórios das culinárias cobertas no site
 *
 * Cada card conterá:
 *    1 - Nome do páis
 *    2 - Uma foto de um prato local, thumbnail do card
 *    3 - Uma breve descrição da culinária
 *    4 - Dois botẽs, um para lista de receitas e outro para restaurantes conhecidos
 *
 * os cards ficarão num único container, que terá dois cards for linha e, se houver um número impar de cards
 * , um único card na última linha
 *
 */

// -----------------------------------------------------------
// carrega os países no arquivados e gera, para cada um, um objeto contendo os file paths para a thumbnail
// e a descrição culinaria
// -----------------------------------------------------------
let carrega_paises = function(){
   
   const path = "/assets/desc-coz/lista.txt";

   let f = fopen( path, "r" );
   let n = int( read_line( f ) );

   let proto_cards = [];
   let path1, path2, nome, objt;
   for( let i = 0 ; i < n ; i++ ){
      pais = read_line( f );
      path1 =  "/assets/desc-coz/" + ${nome} + "/thumbnail.png";
      path2 =  "/assets/desc-coz/" + ${nome} + "/Intro.txt";
      objt = { nome : pais , foto : path1 , desc : path2 };

      proto_cards.push( objt );
   }

   fclose( f );
   return proto_cards;
}

let carrega_descript = function( path_desc ){

   let f = fopen( path, "r" );
   let s = read( f );
   fclose( f );

   return s;
}

let gera_card = function( pais ){

   let s = carrega_descript( pais.desc );

   let card_txt = `
   <div class = "card mb-4 border-primary">
			<div class = "card-body">
				<div class = "text-center">
					<img src="${pais.foto}" alt ="${pais.nome}" width = 500 height = 400>
					<h5 class ="card-title">${pais.nome}</h5>
				</div>
				<p class="card-text text-justify">${s}</p>
				<button type="button" class="btn btn-outline-primary mr-auto">Restaurantes<button>
				<button type="button" class="btn btn-outline-primary ml-auto">Receitas<button>
			</div>
	</div>`;

   return card_txt;
}

let gera_div_principal = function( card_array ){

   let m = card_array.length;
	let inner_div = "";
	let card1 , card2;
	for( let i = 0; i < Math.floor( m/2 ); i++ ){

		card1 = card_array[ 2*i ];
		card2 = card_array[ 2*i + 1 ];

		inner_div += `
		<div class = "row px-2">
			<div class = "col px-2">
				${card1}
				${card2}
			</div>
		</div>
		`;
	}if( m%2 === 1 ){
		card1 = card_array[ -1 ];
		inner_div += `
		<div class = "row px-2">
			<div class = "col px-2">
				    ${ "\t" + card1}
			</div>
		</div>
		`;
	}

	let result =`
	<div class = "container" >
		${inner_div}
	</div>
	`;

	return result;
}

// Agora começa o script para valer. -------------------------------------------------

const objt_array = carrega_paises()
const card_array = objt_array.map( (pais) => ( gera_card( pais ) ) );
let div = gera_div_principal( card_array );

$( body ).append( div );
