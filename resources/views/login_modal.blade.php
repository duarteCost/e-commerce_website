<!--modal-->
<!-- The Modal -->
<div id="id01" class="modal">
    <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
    <!-- Modal Content -->
    <div class="modal-content form-content">

        <div class="form-header login-form-header ">
            <div class="form-header-right">
                <img style="width: 50%"  src="../images/logo.png">
            </div>
            <div  class="form-header-left">
                <h4>Enjoy the Nearsoft payment services</h4>
                <h3>Login</h3>
            </div>
            <br style="clear:both"/>
        </div>
        <div class="form-body">
            <form id="login-form" method="POST" action="index.html">
                <div class="form-group email">
                    <label><span class="glyphicon glyphicon-user span-customized"></span> Email</label>
                    <input type="textbox" class="form-control form-element" name="email" placeholder="Email" required>
                </div>
                <div class="form-group password">
                    <label><span class="glyphicon glyphicon-eye-open span-customized"></span> Password</label>
                    <input type="password" class="form-control form-element" name="password" placeholder="Password" required>
                </div>
                <p class="submit-error" id="error-message"></p>
                <br>
                <button type="submit" class="btn btn-block submit-btn"><span class="glyphicon glyphicon-lock"></span>&nbsp; Login</button>
            </form>
        </div>
        <div class="modal-footer">

            <div class="pull-left"><button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button></div>
            <p>Don't have an account?<a id = "sing_up"> Sign up here</a></p><br>
        </div>
    </div>
</div>