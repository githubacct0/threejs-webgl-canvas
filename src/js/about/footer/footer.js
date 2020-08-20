jQuery(document).ready(function() {

    $('form').on('submit', function(e) {

        e.preventDefault();

        var valid = true;
        var userName = $("#userName").val();
        var userEmail = $("#userEmail").val();
        var userContent = $("#content").val();
        var userCompany = $("#company").val();

        $(".info").html("");

        if (userName == "") {
            $("#userName").css('border', '#e66262 1px solid');
            valid = false;
        }
        if (userEmail == "") {
            $("#userEmail").css('border', '#e66262 1px solid');
            valid = false;
        }
        if (userCompany == "") {
            $("#company").css('border', '#e66262 1px solid');
            valid = false;
        }
        if (!userEmail.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
            $("#userEmail").css('border', '#e66262 1px solid');
            valid = false;
        }
        if (userContent == "") {
            $("#content").css('border', '#e66262 1px solid');
            valid = false;
        }
        console.log(valid);

        if (valid) {

            jQuery('#formSubmit').prop('disabled', true);
            jQuery('#formSubmit').val('Sending...');

            $.ajax({
                type: "POST",
                url: 'mail.php',
                data: { email: userEmail, name: userName, content: userContent },
                success: function(res) {
                    result = JSON.parse(res);
                    if (result.success) {
                        jQuery('#message-box').html(result.message);
                        jQuery('#formSubmit').prop('disabled', false);
                        jQuery('#formSubmit').val('Submit');
                        $("#userName").val('');
                        $("#company").val('');
                        $("#userEmail").val('');
                        $("#content").val('');
                    } else {
                        jQuery('#message-box').html('Failed to send mail');
                        jQuery('#formSubmit').prop('disabled', false);
                        jQuery('#formSubmit').val('Submit');
                    }
                },
            });
        }

    });

});
