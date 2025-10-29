(function($) {
    "use strict";
    $(document).ready(function () {
        var myCurRt = $('#cp_currency_rt').val();
        var myCurPerc = $('#bal_trans_percent').val();
        var myCurren = $('#currency').val()

        let fixedCharge, percentCharge;
        fixedCharge = +myCurRt;
        percentCharge = +myCurPerc;
        $('#amount').on('keyup',function () {
            var amt = this.value;
            if (($.isNumeric(amt)) && (parseFloat(amt) > 0)){
                var perCharge = parseFloat(amt);
                var totalCharge = perCharge/parseFloat(fixedCharge);
                var m = 'Total '+parseFloat(totalCharge.toFixed(8))+' '+myCurren+' wil deduct from your balance.';
                msg(m);
            } else {
                msg('Amount should be numeric & greater than 0');
            }

        });
        function msg(msg) {
            $('.wrnMsg').text(msg);
        }
    });   


    $(document).ready(function () {
        $('.planSelect').on('change',function () {
                var option = JSON.parse($('option:selected', this).attr('planDetail'));
                $('.subBtn').on('click',function () {                    
                let invAmount = $('#investAmount').val();
                if ((parseFloat(invAmount) >= parseFloat(option.min_amount)) && (parseFloat(invAmount) <= parseFloat(option.max_amount))) {
                    let returnAmt = (parseFloat(invAmount)*parseFloat(option.percent))/100;
                    let totalGetAmount = parseFloat(returnAmt)*parseFloat(option.action);
                    let totalNetProfit = parseFloat(totalGetAmount)+parseFloat(invAmount);
                    $('.roiMsg').text(''+totalNetProfit+'');
                    $('.roiPerc').text(''+option.percent+' % ');
                    $('.roiAction').text(''+option.action+'');
                    $('.totalGetAmount').text(''+totalGetAmount+'');
                }else {
                    getBlank();
                }
            });
        });
    });

    $(document).ready(function () {
        var myCurFixFund = $('#bal_trans_fixed_Fund').val();
        var myCurPercFund = $('#bal_trans_percent_Fund').val();
        var myCurrenFund = $('#currency_Fund').val()

         let fixedChargeFund, percentChargeFund;
         fixedChargeFund = +myCurFixFund;
         percentChargeFund = +myCurPercFund;
         
         $('#amountFund').on('keyup',function () {
             var amtFund = this.value;
             if (($.isNumeric(amtFund)) && (parseFloat(amtFund) > 0)){
                 var perChargeFund = (parseFloat(amtFund)*parseFloat(percentChargeFund))/100;
                 var totalChargeFund = perChargeFund+parseFloat(fixedChargeFund);
                 var totalFund = parseFloat(amtFund)+parseFloat(totalChargeFund);
                 var n = 'Total '+parseFloat(totalFund)+' '+myCurrenFund+' will deduct from your balance.';
                 msg(n);
             } else {
                 msg('Amount should be numeric & greater than 0');
             }

         });
         function msg(msg) {
             $('.wrnMsg').text(msg);
         }
     });


        $(".subPre").on('click',function() {
            document.getElementById('submitPayment').submit();
        });
        
        $(document).ready(function () {
            $(".custom-control-input").change(function() {
                if(this.checked && $(this).val() > 69) {
                    $('#depositModal').modal('show');
                    $('.gateWayFour').html($(this).attr('data-valFour'));
                }
            });

        var navListItems = $('div.setup-panel div a'),
            allWells = $('.setup-content'),
            allNextBtn = $('.nextBtn');

        allWells.hide();

        navListItems.click(function (e) {
            e.preventDefault();
            var $target = $($(this).attr('href')),
                $item = $(this);

            if (!$item.hasClass('disabled')) {
                navListItems.removeClass('btn-success').addClass('btn-default');
                $item.addClass('btn-success');
                allWells.hide();
                $target.show();
                $target.find('input:eq(0)').focus();
            }
        });

        allNextBtn.click(function () {
            var curStep = $(this).closest(".setup-content"),
                curStepBtn = curStep.attr("id"),
                nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
                curInputs = curStep.find("input[type='text'],input[type='url']"),
                isValid = true;

            $(".form-group").removeClass("has-error");
            for (var i = 0; i < curInputs.length; i++) {
                if (!curInputs[i].validity.valid) {
                    isValid = false;
                    $(curInputs[i]).closest(".form-group").addClass("has-error");
                }
            }

            if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
        });

        $('div.setup-panel div a.btn-success').trigger('click');
    });



    $(document).ready(function () {
        var myCurren = $('#currency').val()
        var myCpCurren = $('#cp_currency').val()

        $('.submitBtn').css('display','none');

        $('.investFixed').on('click',function () {
            $('#purPlanTwo').attr('action',$(this).data('route'));
            let retuenPerFix = $(this).data('all')['percent'];
            let amtFix = $(this).data('all')['fixed_amount'];
            $('.fixTitle').text($(this).data('all')['name']);
            $('.tAmountFix').text(amtFix+' '+myCurren+' will deduct from your balance');
            $('.totalGetAmountFix').text('You will get '+retuenPerFix+'% of your Invest for Lifetime');
        });

        $('.investRoi').on('click',function () {
            $('#purPlan').attr('action',$(this).data('route'));
            $('#investAmount').val('');
            getBlank();
            let minAmount = $(this).data('all')['min_amount'];
            let maxAmount = $(this).data('all')['max_amount'];
            let retuenPer = $(this).data('all')['percent'];
            let retuenAction = $(this).data('all')['action'];
            $('.roiTitle').text($(this).data('all')['name']);
            $('.roiMinMax').text('Minimum '+minAmount+' '+myCurren+' - Maximum '+maxAmount+' '+myCurren+'');
            $('#investAmount').on('keyup',function () {
                let invAmount = this.value;
                if ((parseFloat(invAmount) >= parseFloat(minAmount)) && (parseFloat(invAmount) <= parseFloat(maxAmount))) {
                    let returnAmt = (parseFloat(invAmount)*parseFloat(retuenPer))/100;
                    let totalGetAmount = parseFloat(returnAmt)*parseFloat(retuenAction);
                    $('.roiMsg').text('You will get '+returnAmt+' '+myCurren+' for '+retuenAction+' times');
                    $('.totalGetAmount').text('You will get total '+totalGetAmount+' '+myCurren+' after complete ROI');
                    $('.submitBtn').css('display','block');
                }else {
                    $('.submitBtn').css('display','none');
                    getBlank();
                }
            })
        });

        $('.investCrypto').on('click',function () {
            $('#purPlanThree').attr('action',$(this).data('route'));
            $('#investAmountThree').val('');
            getBlank();
            let minAmount = $(this).data('all')['min_amount'];
            let maxAmount = $(this).data('all')['max_amount'];
            let retuenPer = $(this).data('all')['percent'];
            let retuenAction = $(this).data('all')['action'];
            $('.roiTitleThree').text($(this).data('all')['name']);
            $('.roiMinMaxThree').text('Minimum '+minAmount+' '+myCpCurren+' - Maximum '+maxAmount+' '+myCpCurren+'');
            $('#investAmountThree').on('keyup',function () {
                let invAmount = this.value;
                if ((parseFloat(invAmount) >= parseFloat(minAmount)) && (parseFloat(invAmount) <= parseFloat(maxAmount))) {
                    let returnAmt = (parseFloat(invAmount)*parseFloat(retuenPer))/100;
                    let totalGetAmount = parseFloat(returnAmt)*parseFloat(retuenAction);
                    let ttAmount = totalGetAmount.toFixed(8);
                    $('.roiMsgThree').text('You will get '+returnAmt+' '+myCpCurren+' for '+retuenAction+' times');
                    $('.totalGetAmountThree').text('You will get total '+ttAmount+' '+myCpCurren+' after complete Crypto');
                    $('.submitBtn').css('display','block');
                }else {
                    $('.submitBtn').css('display','none');
                    getBlank();
                }
            })
        });
        function getBlank() {
            $('.roiMsgThree').text('');
            $('.totalGetAmountThree').text('');
        }
    });

    $(document).ready(function () {
        $(document).on('click', '.myrefButtonFunction', function() {
            var copyText = document.getElementById("myInputref");
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");
            alert("Copied referral link : " + copyText.value);
        })
    });


    $(document).ready(function () {
        var myCurRt = $('#cp_currency_rt').val();
        var myCurPerc = $('#bal_trans_percent').val();
        var myCurren = $('#currency').val()

        let fixedCharge, percentCharge;
        fixedCharge = +myCurRt;
        percentCharge = +myCurPerc;
        $('#amount').on('keyup',function () {
            var amt = this.value;
            if (($.isNumeric(amt)) && (parseFloat(amt) > 0)){
                var perCharge = parseFloat(amt);
                var totalCharge = perCharge/parseFloat(fixedCharge);
                var m = 'Total '+parseFloat(totalCharge.toFixed(8))+' '+myCurren+' wil deduct from your balance.';
                msg(m);
            } else {
                msg('Amount should be numeric & greater than 0');
            }

        });
        function msg(msg) {
            $('.wrnMsg').text(msg);
        }
    });


})(jQuery);