<?php
declare(strict_types=1);

function handle_stats(): void {
    $me = current_user();
    $platform = $_GET['platform'] ?? 'twitter';
    if (!in_array($platform, ['twitter','facebook','instagram','youtube'], true)) $platform = 'twitter';
    $keys = stat_keys($platform);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $preset = $_POST['preset'] ?? '';
        if (in_array($preset, ['low','medium','high'], true)) {
            $vals = autofill_preset($platform, $preset);
            foreach ($vals as $k => $v) set_stat((int)$me['id'], $platform, $k, (int)$v);
            flash('Auto-filled "' . ucfirst($preset) . '" preset.');
        } else {
            foreach ($keys as $k) {
                if (isset($_POST[$k])) set_stat((int)$me['id'], $platform, $k, (int)$_POST[$k]);
            }
            flash('Stats updated.');
        }
        redirect(url(['action'=>'stats','platform'=>$platform]));
    }

    $stats = all_stats((int)$me['id'], $platform);

    render_header($platform, 'Edit stats');
    render_flash();
    ?>
    <h2>Edit stats — <?= e(ucfirst($platform)) ?></h2>
    <div class="stats-tabs">
      <?php foreach (['twitter','facebook','instagram','youtube'] as $p): ?>
        <a class="<?= $p===$platform?'active':'' ?>" href="<?= url(['action'=>'stats','platform'=>$p]) ?>"><?= e(ucfirst($p)) ?></a>
      <?php endforeach; ?>
    </div>

    <div class="card">
      <h3>Auto-fill preset</h3>
      <form method="post" class="inline">
        <button name="preset" value="low" class="btn-outline">Low</button>
        <button name="preset" value="medium" class="btn-outline">Medium</button>
        <button name="preset" value="high" class="btn-outline">High</button>
      </form>
      <p class="muted small">Applies realistic randomised values across all stat fields for this platform. You can still edit individual values afterwards.</p>
    </div>

    <div class="card">
      <h3>Manual values</h3>
      <form method="post">
        <?php foreach ($keys as $k): ?>
          <label><?= e(ucwords(str_replace('_',' ',$k))) ?>
            <input type="number" name="<?= e($k) ?>" value="<?= (int)$stats[$k] ?>">
          </label>
        <?php endforeach; ?>
        <button class="btn-twitter">Save</button>
      </form>
    </div>
    <?php
    render_footer();
}
