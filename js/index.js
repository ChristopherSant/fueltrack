 var url = 'https://api.myjson.com/bins/83o47'; //
 var vbrand,
     vmodel,
     vyear,
     avgmpg,
     cmpg,
     hmpg,
     estimatedDistance,
     gPrice,
     fuelType,
     amountToFill,
     gasToGalons,
     galonsToGas,
     filledGalons,
     budget,
     totalGalons,
     duplicate_brand,
     form_labels = $('#form-steps-label'),
     vbrand_label = $('#v-brand--btn'),
     mobile_vehicle = $('form[name="vehicle models"]'),
     mobile_v_year = $('#mobile-v-year'),
     vmodel_label = $('#v-model--btn'),
     vyear_label = $('#v-year--btn'),
     data_fuel_type = $('h1[data-fuel-type]'),
     amount_filled = $('#amount-filled'),
     total_galons_label = $('#total-galons'),
     estimated_distance_label = $('#estimated-distance h1'),
     data_city_label = $('[data-mpg-label="city"]'),
     data_highway_label = $('[data-mpg-label="highway"]'),
     data_average_label = $('[data-mpg-label="avg"]'),
     data_city = $('[data-citympg]'),
     data_highway = $('[data-hwmpg]'),
     data_average = $('[data-avgmpg]'),
     length_unit_btn = $('#change-length');

 //fetch viewport with for mobile mode purposes
 var windowSize = $(window).width();

 if (windowSize <= 768) {
     form_labels.appendTo('#car-model');
 }
   
 

 $.get(url, function(data) {

     vbrand_label.click(selectOtherVehicle);
     vmodel_label.click(vehicleModel_backBtn);
     vyear_label.html('Año');
     vmodel_label.html('Modelo');


     // Appends vehicle info to MPG resume
     function mpg_resume() {
         $('#v-brand-model').append(vbrand + " " + vmodel + " " + vyear);
         data_city_label.html('MPG en ciudad ');
         data_highway_label.html('MPG en autopistas ');
         data_average_label.html('Promedio de MPG ');
         data_city.html(cmpg);
         data_highway.html(hmpg);
         data_average.html(avgmpg);

     };



     //Triggers the vehicle MPG resume
     $('#continue-btn').click(function() {
         $('#mpg-calculator').removeClass('hide');
         $('#car-model, #continue-btn, #mobile-v-year').addClass('hide');
         $('#car-model .container').empty();
         mpg_resume();
         if (windowSize <= 760) {
             length_unit_btn.removeClass('left');
         }
     });

     //Captures year of the vehicle and validates info to enable MPG resume
     function v_years() {
         vyear = '';
         vyear = $(this).text();
         vyear_label.html(vyear);
         vyear_label.removeClass('focus').addClass('active');
         //Checks if the 3 key variables have info and fetches the MPG info for the vehicle model
         if (vyear !== '' && vbrand !== '' && vmodel !== '') {
             $.each(data, function brand(i, obj) {
                 if (vyear == obj.year && vbrand == obj.make && vmodel == obj.model) {
                     avgmpg = obj.comb08;
                     cmpg = obj.city08;
                     hmpg = obj.highway08;
                 }
             });
             $('#continue-btn').removeClass('hide');

         }

     };

     function years() {
         if (windowSize <= 760) {
             mobile_vehicle.addClass('hide');
             $('#fwd-btn').addClass('hide');
         } else {
             $('#v-model').addClass('hide');
             $('#v-model-year').removeClass('hide');
             vmodel_label.html(vmodel).removeClass('active');
             vyear_label.addClass('active');
         }

         $('#car-model .container').empty();
         $.each(data, function brand(i, obj) {
             if (vmodel == obj.model) {
                 var v_model_years = '<span class="v-label" data-model-year="' + obj.year + '">' + obj.year + '</span>';
                 if (windowSize <= 760) {
                     $('#mobile-v-year').append(v_model_years);
                     console.log(obj.year);

                 } else {
                     //
                     $('#v-model-year').append(v_model_years);

                 }

                 $('[data-model-year="' + obj.year + '"]').not('[data-model-year="' + obj.year + '"]:eq(0)').remove();

             }


         });


         $('[data-model-year]').click(v_years);

     };
     // Captures the model
     function v_model() {
         vmodel = '';
         vmodel = $(this).text();
         vyear_label.removeClass('active').addClass('focus');

         if (vmodel !== '') {
             $('#car-model .container').empty();
         }
         // Executes function that populates "Years" tab
         years();
         vmodel_label.addClass('active').removeClass('focus');
     };

     $('#mobile-v-model').mouseleave(function() {

         vmodel = $('#mobile-v-model option:selected').attr('data-model');

         if (vmodel !== "" || vmodel !== "-") {
             $('#fwd-btn').removeClass('hide');
         }

         if (vmodel === "-") {
             $('#fwd-btn').addClass('hide');
         } //




     })



     function models() {
         var v_models;

         $('#v-model').removeClass('hide');
         $('#car-model .container').empty();
         vbrand_label.html(vbrand).removeClass('active');
         form_labels.prependTo('#car-model');
         $.each(data, function brand(i, obj) {
             if (vbrand == obj.make) {
                 if (windowSize <= 768) {
                     v_models = '<option data-model="' + obj.model + '">' + obj.model + '</option>'; //
                     $('#mobile-v-model').append(v_models);
                     $('#mobile-v-model option[data-model="' + obj.model + '"]').not('option[data-model="' + obj.model + '"]:eq(0)').remove();

                 } else {
                     v_models = '<span class="v-label" data-model="' + obj.model + '">' + obj.model + '</span>';
                     $('#v-model').append(v_models);
                     $('span[data-model="' + obj.model + '"]').not('[data-model="' + obj.model + '"]:eq(0)').remove();
                 }

             }

             $('#car-model').removeClass('hide');


         });


         $('[data-model]').click(v_model);
         $('#fwd-btn').click(function() {
             mobile_v_year.removeClass('hide');
             vmodel_label.html(vmodel);
             years();
             if (windowSize <= 768) {

                 vyear_label.removeClass('hide');
                 vbrand_label.addClass('hide');
                 vmodel_label.removeClass('active');
                 vyear_label.addClass('active');
             }
         });

         vmodel_label.addClass('focus');

     };

     //Move Vehicle select labels

     function move_v_labels_to_box() {
         if (windowSize >= 768) {
             form_labels.appendTo('#car-model');
             $('#v-model--btn,#v-year--btn').css('color', '');
             form_labels.width('100%');
             form_labels.css({
                 'color': '',
                 'box-sizing': 'inherit',
                 'max-width': '1200px'
             });
         }
     }

     function move_v_labels_to_search() {
         form_labels.appendTo('#search-bar');
         form_labels.width('33.34%');
         $('#v-brand--btn').addClass('hide');
         $('#v-model--btn,#v-year--btn').css('color', '#9b9b9b');
         $('#v-model--btn,#v-year--btn').removeClass('active focus');
     }
     // Captures brand value of clicked element
     function v_brand() {
         vbrand_label.removeClass('hide');
         vbrand = '';
         vbrand = $(this).text();
         vmodel_label.removeClass('active').addClass('focus');
         if (vbrand !== '') {
             $('#filter-records, #search-bar').addClass('hide');
             $('#filter-records').empty();
         }
         if (windowSize <= 768) {
             vyear_label.addClass('hide');
             mobile_vehicle.removeClass('hide');
         }
         move_v_labels_to_box();
         models();


     };

     function hash(o) {
         return o.make;
     }



     var content;

     function createBrand() {


         var hashesFound = {};

         data.forEach(function(o) {
             hashesFound[hash(o)] = o;
         });

         var results = Object.keys(hashesFound).map(function(k) {
             return hashesFound[k];
         })

         $.each(hashesFound, function brand(i, obj) {


             if (windowSize >= 760) {
                 content = '<span id="' + obj.make + '" class="v-label" data-brand="' + obj.make + '">' + obj.make + '</span>';
                 $('#filter-records').append(content);
             } else {

             }
         });

         $('#filter-records .v-label').click(v_brand);

     }
     //On 

     // Back to model Select
     function vehicleModel_backBtn() {
         vyear = 0;
         vmodel_label.addClass('active');
         vyear_label.html('Año').removeClass('active');
         if (windowSize <= 768) {

             vyear_label.html('Año').addClass('hide');
             vmodel_label.html('Modelo');
             vbrand_label.removeClass('hide');
             $('#continue-btn').addClass('hide');
             mobile_vehicle.removeClass('hide');
             mobile_v_year.addClass('hide').empty();

             //$('#v-model-year').addClass('hide').empty();
         } else {
             $('#v-model-year').addClass('hide').empty();
             $('#continue-btn').addClass('hide');
         }

         models();
     }
     //
     // Restart Vehicle Select
     function selectOtherVehicle(e) {

         vyear_label.html('Año');
         vmodel_label.html('Modelo').addClass('active');

         if (windowSize <= 768) {

             mobile_vehicle.addClass('hide');
             $('#mobile-v-model').empty().html('<option data-model="-">-</option>');
         }
         $('#mpg-calculator, #car-model, #mpg-resume, #v-model-year, #continue-btn, #btn-grid').addClass('hide');
         $('#filter-records, #search-bar, [name="estimator"]').removeClass('hide');
         $('[data-citympg], [data-hwmpg], [data-avgmpg], #v-brand-model, #v-year').empty();
         emptyMpgResume();
         $('[name="cantidad_rd$"], [name="cantidad_galones"]').val('');
         length_unit_btn.attr('data-unit', 'miles');
         $('#v-brand-model').prependTo('#v-resume');;
         if (windowSize >= 768) {
             move_v_labels_to_search();
         }
         createBrand();
         $('span[data-brand]').click(v_brand);

         if (windowSize <= 760) {
             length_unit_btn.appendTo('#v-resume');
         } else {
             length_unit_btn.appendTo('#v-resume');
             length_unit_btn.removeClass('right').addClass('left');
         }
         avgmpg = undefined,
             cmpg = undefined,
             hmpg = undefined;
        $('#change-length').on('click',mpg_data_change);
        e.preventDefault();

     }

     // Ejecuta la funcion que popula div con las marcas
     $("#txt-search").click(function() {
         $('#filter-records').empty();

         if (windowSize >= 768) {
             createBrand();

         }
     });


     //corre el evento que guarda la marca
     $('span[data-brand]').click(v_brand);

     // Funcion del Search Bar
     $('#txt-search').keyup(function() {
         var searchField = $(this).val();
         if (searchField === '') {
             $('#filter-records').html('');
             return;
         }
         var regex = new RegExp(searchField, 'i');
         var count = 1;
         var output = "";
         $.each(data, function(i, obj) {

             if (obj.make.search(regex) != -1) {
                 output += '<span id="' + obj.make + '" class="v-label">' + obj.make + '</span>';

                 if (count % 2 == 0) {
                     output += '<span id="' + obj.make + '" class="v-label">' + obj.make + '</span>';
                 }

                 count++
             }
             if (obj.make.search(regex) !== obj.make) {
                 $('#filter-records').empty();
             }

             $('#filter-records').append(output);
             $('#txt-search').keyup(function() {
                 $('span[id="' + obj.make + '"]').not('span[id="' + obj.make + '"]:eq(0)').remove();
             });
             $('#filter-records .v-label').click(v_brand);

         });

     });


     $('[name="otherCar"]').click(selectOtherVehicle); //


 });

 //Reinicia los calculos


 function estimator() {
     budget = parseInt($('input[name="cantidad_rd$"]').val());
     totalGalons = $('input[name="cantidad_galones"]').val();
     data_fuel_type.append(fuelType);
     $('#v-brand-model').prependTo('#mpg-calculator');
     amount_filled.append(" RD$ " + budget);
     total_galons_label.append(totalGalons + " Gls.");
     estimatedDistance = (totalGalons * avgmpg).toFixed(1);
     if (length_unit_btn.attr('data-unit') === 'miles') {
         estimated_distance_label.html(estimatedDistance + " Millas");
     } else {
         estimated_distance_label.html(estimatedDistance + " Kilometros");
     }

 };

 //Gets Values budget to galons
 $('input[name="cantidad_rd$"]').keyup(function() {
     gPrice = parseInt($('select[data-fuel] option:selected').val());
     amountToFill = parseInt($('input[name="cantidad_rd$"]').val());
     gasToGalons = (amountToFill / gPrice).toFixed(1);
     $('input[name="cantidad_galones"]').val(gasToGalons);


 });

 //Gets Values galons to budget
 $('input[name="cantidad_galones"]').keyup(function() {
     gPrice = parseInt($('select[data-fuel] option:selected').val());
     galonsToGas = ($('[name="cantidad_galones"]').val() * gPrice).toFixed(1);
     $('input[name="cantidad_rd$"]').val(galonsToGas);
 });

 $('#mpg-calculate-btn').click(function(e) {
     $('[name="estimator"]').addClass('hide');
     $('#mpg-resume, #btn-grid').removeClass('hide');
     fuelType = $('select[data-fuel] option:selected').text();
     estimator();
     if (windowSize <= 760) {
         length_unit_btn.prependTo('#btn-grid');
     } else {
         length_unit_btn.appendTo('#v-brand-model');
         length_unit_btn.removeClass('left').addClass('right');
     }

     e.preventDefault();
 });

 function restartEstimator() {
     $('#mpg-resume, #btn-grid').addClass('hide');
     $('[name="estimator"]').removeClass('hide');
     emptyMpgResume();
     $('#v-brand-model').prependTo('#v-resume');
     if (windowSize <= 760) {
         length_unit_btn.appendTo('#v-resume');
     } else {
         length_unit_btn.appendTo('#v-resume');
         length_unit_btn.removeClass('right').addClass('left');
     }


 };


 function emptyMpgResume() {
     $('#amount-filled span, #total-galons span,h1[data-fuel-type], #estimated-distance span, h1[data-fuel-type],#amount-filled,#total-galons,#estimated-distance h1').empty();

 };



 $('button[name="reset"]').click(restartEstimator);



 //Create a image based in the estimate
 function htmlToCanvas() {
     // This gets date values for file naming purpuse
     var d = new Date(),
         eYear = d.getFullYear(),
         eMonth = d.getMonth(),
         eDay = d.getDay(),
         eHour = d.getHours(),
         eMinutes = d.getMinutes();

     html2canvas($('#calc-values'), {
         onrendered: function(canvas) {
             var a = document.createElement('a');
             a.href = canvas.toDataURL("image/png");
             a.download = "" + eDay + "_" + eMonth + "_" + eYear + "_" + "- h" + eHour + "m" + eMinutes + "-fecha_estimado";
             a.click();
         }
     });
 };
 //Fires image creation 
 $('[name="saveEstimated"]').click(function() {
     htmlToCanvas();
 });

$('#change-length').on('click',mpg_data_change);

 function ml_to_km() {
     avgmpg = parseInt((avgmpg * 1.60934).toFixed(1));
     cmpg = parseInt((cmpg * 1.60934).toFixed(1));
     hmpg = parseInt((hmpg * 1.60934).toFixed(1));
     estimatedDistance = parseInt((estimatedDistance * 1.60934).toFixed(1));
 };

 function km_to_ml() {
     avgmpg = parseInt((avgmpg / 1.60934).toFixed(0));
     cmpg = parseInt((cmpg / 1.60934).toFixed(0));
     hmpg = parseInt((hmpg / 1.60934).toFixed(0));
     estimatedDistance = parseInt((estimatedDistance / 1.60934).toFixed(0));
 };

 function mpg_resume_injector() {
     if (length_unit_btn.attr('data-unit') === 'miles') {

         data_city_label.html('Km  por Galón en ciudad ');
         data_highway_label.html('Km  por Galón en autopistas ');
         data_average_label.html('Promedio de Km  por Galón ');
         data_city.html(cmpg);
         data_highway.html(hmpg);
         data_average.html(avgmpg);
         estimated_distance_label.html(estimatedDistance + " Km");

     } else if (length_unit_btn.attr('data-unit') === 'km') {

         data_city_label.html('MPG en ciudad ');
         data_highway_label.html('MPG en autopistas ');
         data_average_label.html('Promedio de MPG ');
         data_city.html(cmpg);
         data_highway.html(hmpg);
         data_average.html(avgmpg);
         estimated_distance_label.html(estimatedDistance + " Millas");

     }
 };

 function mpg_data_change(e) {
     if (length_unit_btn.attr('data-unit') === 'miles') {
         console.log('hola');
         ml_to_km();     
         mpg_resume_injector();
         $(this).attr('data-unit','km');
         $(this).html('Cambiar a Millas');

     } else if (length_unit_btn.attr('data-unit') === 'km') {
         km_to_ml();
         mpg_resume_injector();
         $(this).attr('data-unit', 'miles');
         $(this).html('Cambiar a KM');
     }
     e.preventDefault();
 };